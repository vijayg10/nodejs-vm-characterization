- Install locust
- Start the two applications using the following commands
  ```
  npm run start:with-vm
  npm run start:without-vm
  ```
- Open the following pages side by side
  - http://localhost:3000/status
  - http://localhost:3001/status
- Start the locust server using the following command
  ```
  locust -f locustfile.py --host localhost
  ```
- Generate the load using the web interface
  http://localhost:8089
- Observe the metrics in the two webpages