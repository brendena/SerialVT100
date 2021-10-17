import time
import serial

# configure the serial connections (the parameters differs on the device you are connecting to)
ser = serial.Serial(
    port='/dev/ttyUSB3',
    baudrate=115200,
    parity=serial.PARITY_NONE,
    stopbits=serial.STOPBITS_ONE,
    bytesize=serial.EIGHTBITS,
    timeout=1
)

print("is open")
print(ser.isOpen())

while 1:
	ser.write('sending this out \r\n'.encode())
	s = ser.read(100) 
	print(s)
	time.sleep(1)
