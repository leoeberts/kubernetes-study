window.moduleData = {
  id: "09-voting-app",
  projectNumber: "09",
  title: "Pod-Based Voting Application",
  complexity: "advanced",
  description: "Complete multi-tier voting application using Kubernetes pods and services",
  pageTitle: "09 - Pod-Based Voting Application",
  headerIcon: "🗳️",
  headerTitle: "Pod-Based Voting Application", 
  headerDesc: "Complete multi-tier voting application using Kubernetes pods and services",
  infoCards: [
    {
      title: "🏗️ Components", 
      components: [
        { label: "Voting Pod", desc: "Frontend voting interface (dockersamples/examplevotingapp_vote)" },
        { label: "Result Pod", desc: "Results display interface (dockersamples/examplevotingapp_result)" },
        { label: "Worker Pod", desc: "Vote processing logic (dockersamples/examplevotingapp_worker)" },
        { label: "Redis Pod", desc: "In-memory cache for vote queue (redis)" },
        { label: "PostgreSQL Pod", desc: "Database for vote storage (postgres)" }
      ]
    },
    {
      title: "🎯 Key Concepts",
      components: [
        { label: "Multi-tier Architecture", desc: "Frontend, backend, cache, and database tiers" },
        { label: "Pod Communication", desc: "Inter-pod communication via services" },
        { label: "Data Flow", desc: "Votes flow from frontend through worker to database" },
        { label: "Service Discovery", desc: "Pods discover each other via Kubernetes DNS" }
      ]
    },
    {
      title: "📋 Deployment Commands",
      code: `# Deploy all pods
kubectl apply -f 09.00.voting-app-pod.yml
kubectl apply -f 09.01.result-app-pod.yml
kubectl apply -f 09.02.worker-app-pod.yml
kubectl apply -f 09.03.redis-pod.yml
kubectl apply -f 09.04.postgres-pod.yml

# Deploy all services
kubectl apply -f 09.00.voting-service.yml
kubectl apply -f 09.01.result-service.yml
kubectl apply -f 09.03.redis-service.yml
kubectl apply -f 09.04.postgres-service.yml

# Check all resources
kubectl get pods,services

# Access voting app
# http://<node-ip>:30080

# Access results app
# http://<node-ip>:30081`
    }
  ]
};