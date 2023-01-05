from locust import HttpUser, task

class SampleTest(HttpUser):
    @task
    def rules_engine_perf_test(self):
        self.client.get("http://localhost:3000/rules?subScenario=REMITTANCE", name="With Rules Engine")
        self.client.get("http://localhost:3001/?subScenario=REMITTANCE", name="Direct Logic")
