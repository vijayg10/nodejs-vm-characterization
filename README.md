## Objective
The objective is to characterize the rules engine used in `central-settlement` service.
Need to prepare a baseline Rules script when running in native node vs via the Rules processing engine.

## Test program with basic conditional logic
Prepared a sample nodeJS program which runs an express server exposing a sample route `GET /`.
When we pass the query parameter `subScenario` on this route (like `GET /?subScenario=REMITTANCE`), it responds with a text message saying that the subScenario is `REMITTANCE` or `default` based on the query parameter passed with an `if` condition.

This logic is implemented in three ways and calculated the performance overhead for all the approaches.
- Using native code - Used `if` condition directly in the route handler to check the query parameter
- Using nodeJS VM module - The `if` condition logic is passed as an external script to the nodeJS program and executed by the module `vm` in an isolated context and outputs the desired action variables
- Using `Json Rules Engine` - The condition is passed as JSON rules and the rules are executed by handler and catch the events fired and output parameters.

## Tools used
- locust - For generating http load and calculate average response time
- express-status-monitor - For monitoring resource usage like CPU, Memory, NodeJS event loop delay ...etc
- clinic - As a secondary resource monitoring tool for double checking.

## Steps followed for characterization
- Prepared three sample programs for all the three approaches mentioned above (Native code, VM & JRE) using basic express server with an exposed route.
- Run the three programs on three different ports (3000, 3001 & 3002)
- Prepared a python locust script to hit the three endpoints
- Run the locust with concurrency `10`
- Observe the average response time for all the three endpoints
- Monitor the resources using module `express-status-monitor` (i.e. on URL /status)
- To double check the resource usage, also used `clinic` tool for running the node services and get resource usage graphs

## Observations
- After running the three programs and tested with load, the following is the locust output which shows the average response time difference.
![Locust Output](/assets/images/screenshot-locust.png)
  And the following express server status with resource usage data. In this screen shot, the left one is for native code, middle one is with `VM` and the right one is with `JRE`.
![Express Server Status](/assets/images/screenshot-express-status.png)
  From the above screenshots, we can observe that the resource usage is considerably very high when running the script with the module `VM`(Middle image).
  The resource usage is much less when using `JRE`.

- We can also observe the following HTML reports from the tool `clinic` and get the resource usage graphs for double checking.
  - ![Clinic Report for Native Code](/assets/images/screenshot-clinic-native-code.png)
  - ![Clinic Report for VM module](/assets/images/screenshot-clinic-with-vm.png)
  - ![Clinic Report for JRE module](/assets/images/screenshot-clinic-with-jre.png)

## Conclusion
With the above observations, maintaining rules as javascript code and executing it with `VM` modules adds unnecessary performance overhead.
Maintaining rules as JSON and running them using the module `JRE` seems more elegant solution for this problem.

## Deployment Instructions
- Install locust
  ```
  pip3 install locust
  ```
- Start the three applications using the following commands
  ```
  npm run start:clinic-with-vm
  npm run start:clinic-with-jre
  npm run start:clinic-without-vm
  ```
- Open the following pages side by side
  - http://localhost:3000/status
  - http://localhost:3001/status
  - http://localhost:3002/status
- Start the locust server using the following command
  ```
  locust -f locustfile.py --host localhost
  ```
- Generate the load using the web interface using concurrency `10`
  http://localhost:8089
- Observe the metrics in the three webpages
- Exit the three programs and you can get the clinic reports in html format
