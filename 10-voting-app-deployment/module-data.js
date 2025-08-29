window.moduleData = {
  id: "10-voting-app-deployment",
  projectNumber: "10",
  title: "Deployment-Based Voting Application",
  complexity: "advanced",
  description: "Production-ready voting application using Kubernetes Deployments for scalability and high availability",
  pageTitle: "10 - Deployment-Based Voting Application",
  headerIcon: "🚀",
  headerTitle: "Deployment-Based Voting Application", 
  headerDesc: "Production-ready voting application using Kubernetes Deployments for scalability and high availability",
  infoCards: [
    {
      title: "🏗️ Components", 
      components: [
        { label: "Vote Deployment", desc: "2 replicas of voting frontend (dockersamples/examplevotingapp_vote)" },
        { label: "Result Deployment", desc: "2 replicas of results display (dockersamples/examplevotingapp_result)" },
        { label: "Worker Deployment", desc: "2 replicas of vote processors (dockersamples/examplevotingapp_worker)" },
        { label: "Redis Deployment", desc: "1 replica of Redis cache (redis:alpine)" },
        { label: "DB Deployment", desc: "1 replica of PostgreSQL database (postgres:15-alpine)" }
      ]
    },
    {
      title: "🎯 Key Concepts",
      components: [
        { label: "High Availability", desc: "Multiple replicas prevent single points of failure" },
        { label: "Rolling Updates", desc: "Zero-downtime deployments with controlled rollouts" },
        { label: "Auto-healing", desc: "Failed pods automatically replaced" },
        { label: "Scaling", desc: "Easy horizontal scaling with replica adjustments" }
      ]
    },
    {
      title: "📋 Deployment Commands",
      code: `# Deploy all components
kubectl apply -f .

# Check deployments
kubectl get deployments

# Check services
kubectl get services

# Scale a deployment
kubectl scale deployment vote --replicas=3

# Access voting app
# http://<node-ip>:30080

# Access results app  
# http://<node-ip>:30081

# Rolling update example
kubectl set image deployment/vote vote=dockersamples/examplevotingapp_vote:latest

# Check rollout status
kubectl rollout status deployment/vote`
    }
  ]
};