#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>
#include <DHT.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

// WiFi credentials
const char* ssid = "Labib";
const char* password = "wakiya99";

// Firebase project settings
const char* FIREBASE_HOST = "airtemphum-default-rtdb.asia-southeast1.firebasedatabase.app";
const char* FIREBASE_AUTH = "PZLM4eX2MFsvtEYdBGMHJnW7zS9UMw37tUnk7WiQ";

// Sensor pins
#define DHTPIN D4
#define DHTTYPE DHT11
#define MQ135_PIN A0

// LCD setup
LiquidCrystal_I2C lcd(0x27, 16, 2);

// NTP Client setup
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");

DHT dht(DHTPIN, DHTTYPE);

byte degreeSymbol[8] = {
  0b00110,
  0b01001,
  0b01001,
  0b00110,
  0b00000,
  0b00000,
  0b00000,
  0b00000
};

// Moving average for air quality
const int numReadings = 10;
int airQualityReadings[numReadings];
int readIndex = 0;
long total = 0;

// Breakpoints for AQI calculation
const float CO_Gh = 4.4;  // Upper concentration breakpoint for CO
const float CO_Gl = 0.0;  // Lower concentration breakpoint for CO
const int CO_Ih = 50;     // Upper AQI breakpoint for CO
const int CO_Il = 0;      // Lower AQI breakpoint for CO

const float NH3_Gh = 0.5;  // Adjusted upper concentration breakpoint for NH3
const float NH3_Gl = 0.0;  // Lower concentration breakpoint for NH3
const int NH3_Ih = 500;    // Upper AQI breakpoint for NH3
const int NH3_Il = 0;      // Lower AQI breakpoint for NH3

void setup() {
  Serial.begin(115200);

  // Initialize LCD
  Wire.begin(D2, D1);
  lcd.init();
  lcd.backlight();
  lcd.createChar(0, degreeSymbol);

  // Initialize air quality readings
  for (int i = 0; i < numReadings; i++) {
    airQualityReadings[i] = 0;
  }

  // Display initial message
  lcd.setCursor(0, 0);
  lcd.print("Connecting WiFi");

  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    lcd.print(".");
  }

  Serial.println("\nWiFi connected");
  lcd.clear();
  lcd.print("WiFi Connected!");
  delay(1000);

  // Initialize NTP Client
  timeClient.begin();
  timeClient.setTimeOffset(21600);  // GMT +6 for Bangladesh, adjust as needed

  dht.begin();

  // Warm up MQ135 sensor
  lcd.clear();
  lcd.print("Warming up");
  lcd.setCursor(0, 1);
  lcd.print("sensor...");
  delay(3000);  // 3 second warm-up
}

float calculateAQI(float Cp, float Gl, float Gh, int Il, int Ih) {
  if (Cp < Gl) return 0;                            // Below the lower breakpoint
  if (Cp > Gh) return 500;                          // Above the upper breakpoint
  return ((Cp - Gl) / (Gh - Gl)) * (Ih - Il) + Il;  // Calculate AQI
}

String getAQICategory(int aqi) {
  if (aqi <= 50) return "Good";
  else if (aqi <= 100) return "Moderate";
  else if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  else if (aqi <= 200) return "Unhealthy";
  else if (aqi <= 300) return "Very Unhealthy";
  else return "Hazardous";
}

int getSmoothedAirQuality() {
  total = total - airQualityReadings[readIndex];
  airQualityReadings[readIndex] = analogRead(MQ135_PIN);
  total = total + airQualityReadings[readIndex];
  readIndex = (readIndex + 1) % numReadings;

  float average = total / numReadings;
  float voltage = average * (3.3 / 1023.0);  // Convert to voltage

  // Calculate concentrations (for demonstration)
  float coConcentration = voltage;         // Adjust based on calibration
  float nh3Concentration = voltage * 0.1;  // Example scaling factor for NH3; adjust as needed

  // Calculate AQI for CO and NH3
  float aqiCO = calculateAQI(coConcentration, CO_Gl, CO_Gh, CO_Il, CO_Ih);
  float aqiNH3 = calculateAQI(nh3Concentration, NH3_Gl, NH3_Gh, NH3_Il, NH3_Ih);
  // Determine overall AQI
  return round(max(aqiCO, aqiNH3));
}
void updateLCD(float temp, float hum, int aqi) {
  lcd.clear();
  // First row: Temperature and Humidity
  lcd.setCursor(0, 0);
  lcd.print(temp, 1);
  lcd.write(0);
  lcd.print("C ");
  lcd.print(hum, 1);
  lcd.print("%");
  // Second row: Air Quality Index
  lcd.setCursor(0, 1);
  lcd.print("AQI:");
  lcd.print(aqi);
  lcd.print(" ");
  lcd.print(getAQICategory(aqi).substring(0, 3));  // Show first 3 letters of category
}
void loop() {
  timeClient.update();
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  int airQualityIndex = getSmoothedAirQuality();
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    lcd.clear();
    lcd.print("Sensor Error!");
    delay(2000);
    return;
  }
  // Get timestamp
  String timestamp = String(timeClient.getEpochTime());
  // Update LCD
  updateLCD(temperature, humidity, airQualityIndex);
  // Print values to Serial Monitor
  Serial.println("Time: " + timeClient.getFormattedTime());
  Serial.println("Temperature: " + String(temperature, 2) + "°C");
  Serial.println("Humidity: " + String(humidity, 2) + "%");
  Serial.println("Air Quality Index: " + String(airQualityIndex) + " (" + getAQICategory(airQualityIndex) + ")");
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClientSecure client;
    client.setInsecure();
    HTTPClient https;
    // Prepare JSON data
    String jsonString = "{\"temperature\":" + String(temperature, 2) + ",\"humidity\":" + String(humidity, 2) + ",\"airQualityIndex\":" + String(airQualityIndex) + ",\"airQualityCategory\":\"" + getAQICategory(airQualityIndex) + "\"" + ",\"timestamp\":\"" + timestamp + "\"}";
    String url = String("https://") + FIREBASE_HOST + "/sensor_data.json?auth=" + FIREBASE_AUTH;
    if (https.begin(client, url)) {
      https.addHeader("Content-Type", "application/json");
      int httpResponseCode = https.POST(jsonString);
      if (httpResponseCode > 0) {
        String response = https.getString();
        Serial.println("HTTP Response code: " + String(httpResponseCode));
      } else {
        Serial.println("Error on sending POST: " + String(httpResponseCode));
      }
      https.end();
    }
  }
  delay(5000);  // Wait 5 seconds before next reading
}
