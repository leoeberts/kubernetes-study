window.moduleData = {
  id: "05-deployment",
  projectNumber: "05",
  title: "Deployment Architecture",
  complexity: "intermediate",
  description: "Declarative application deployment with rolling updates",
  pageTitle: "05 - Deployment Architecture",
  headerIcon: "🚀",
  headerTitle: "Deployment Architecture", 
  headerDesc: "Declarative application deployment with rolling updates",
  infoCards: [
    {
      title: "🏗️ Components", 
      components: [
        { label: "Deployment", desc: "myapp-deployment managing pod replicas" },
        { label: "ReplicaSet", desc: "Created automatically by deployment" },
        { label: "Pods", desc: "2 replicas with nginx containers" },
        { label: "Strategy", desc: "Rolling updates for zero downtime" }
      ]
    },
    {
      title: "🎯 Key Concepts",
      components: [
        { label: "Declarative", desc: "Desired state specified in YAML" },
        { label: "Rolling Updates", desc: "Gradual pod replacement strategy" },
        { label: "Replica Management", desc: "Maintains desired pod count" },
        { label: "Self-healing", desc: "Automatically recreates failed pods" }
      ]
    },
    {
      title: "📋 Deployment Commands",
      code: `# Deploy the deployment
kubectl apply -f 05.deployment.yml

# Check deployment status
kubectl get deployments

# Check pods created
kubectl get pods

# Check replicasets
kubectl get rs

# Scale the deployment
kubectl scale deployment myapp-deployment --replicas=3

# Update deployment image
kubectl set image deployment/myapp-deployment nginx-container=nginx:1.21

# Check rollout status
kubectl rollout status deployment/myapp-deployment

# Rollback deployment
kubectl rollout undo deployment/myapp-deployment`
    }
  ]
};