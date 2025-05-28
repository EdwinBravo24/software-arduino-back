//#include <LiquidCrystal.h>

// Inicializar la biblioteca LCD con los números de pins de la interfaz
//LiquidCrystal lcd(8, 9, 4, 5, 6, 7);

// Definir los pines para los botones
//const int btnRIGHT = 0;
//const int btnUP = 1;
//const int btnDOWN = 2;
//const int btnLEFT = 3;
//const int btnSELECT = 4;
//const int btnNONE = 5;

// Variables para el control de botones
//int lastButtonPressed = btnNONE;
//unsigned long lastDebounceTime = 0;
//unsigned long debounceDelay = 200; // Tiempo de debounce en milisegundos

//void setup() {
  // Inicializar la comunicación serial
  //Serial.begin(9600);
  
  // Configurar el LCD
  //lcd.begin(16, 2);
  //lcd.clear();
  //lcd.print("Button Tracker");
  //lcd.setCursor(0, 1);
  //lcd.print("Esperando...");
//}

//void loop() {
  // Leer el valor analógico del pin de botones
  //int adc_key_in = analogRead(0);
  //int key = get_key(adc_key_in);
  
  // Si se presionó un botón (diferente a NONE)
  //if (key != btnNONE && key != lastButtonPressed) {
    // Verificar si ha pasado suficiente tiempo desde la última pulsación (debounce)
    //if ((millis() - lastDebounceTime) > debounceDelay) {
      //lastButtonPressed = key;
      //lastDebounceTime = millis();
      
      // Mostrar en el LCD
      //lcd.clear();
      //lcd.print("Boton presionado:");
      //lcd.setCursor(0, 1);
      
      // Enviar el botón presionado por serial y mostrarlo en LCD
      //switch (key) {
        //case btnRIGHT:
           //Serial.println("RIGHT");
           //lcd.print("RIGHT");
           //break;
         //case btnLEFT:
           //Serial.println("LEFT");
           //lcd.print("LEFT");
           //break;
         //case btnUP:
          // Serial.println("UP");
          // lcd.print("UP");
          // break;
         //case btnDOWN:
          // Serial.println("DOWN");
          // lcd.print("DOWN");
           //break;
         //case btnSELECT:
           //Serial.println("SELECT");
           //lcd.print("SELECT");
         //  break;
      // }
     //}
   //}
  
  // Resetear el último botón presionado si no se presiona ninguno
   //if (key == btnNONE) {
   //  lastButtonPressed = btnNONE;
   //}
  
  // delay(100);
 //}

// Función para convertir el valor analógico a un botón específico
 //int get_key(int input) {
  // Valores aproximados para cada botón
  // if (input > 1000) return btnNONE;
   //if (input < 50)   return btnRIGHT;
   //if (input < 250)  return btnUP;
   //if (input < 450)  return btnDOWN;
   //if (input < 650)  return btnLEFT;
   //if (input < 850)  return btnSELECT;
  
   //return btnNONE;
 //}