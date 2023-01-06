from locust import HttpUser, task

class SampleTest(HttpUser):
    @task
    def rules_engine_perf_test(self):
        self.client.get("http://localhost:3000/?subScenario=REMITTANCE", name="Without VM")
        self.client.get("http://localhost:3001/?subScenario=REMITTANCE", name="With VM")
        self.client.get("http://localhost:3002/?subScenario=REMITTANCE", name="With JRE")
