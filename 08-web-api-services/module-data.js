window.moduleData = {
  id: "08-web-api-services",
  projectNumber: "08",
  title: "Web & API Services Architecture",
  complexity: "intermediate",
  description: "Multi-tier application with web frontend and API backend services",
  pageTitle: "08 - Web & API Services Architecture",
  headerIcon: "🔗",
  headerTitle: "Web & API Services Architecture", 
  headerDesc: "Multi-tier application with web frontend and API backend services",
  infoCards: [
    {
      title: "🏗️ Components", 
      components: [
        { label: "Web Service", desc: "NodePort service (port 30080) for external access" },
        { label: "API Service", desc: "ClusterIP service (port 8080) for internal communication" },
        { label: "Web Deployment", desc: "Frontend pods with app: web label" },
        { label: "API Deployment", desc: "Backend pods with app: api label" }
      ]
    },
    {
      title: "🎯 Key Concepts",
      components: [
        { label: "Service Types", desc: "NodePort for external, ClusterIP for internal access" },
        { label: "Multi-tier Architecture", desc: "Separate web frontend and API backend tiers" },
        { label: "Service Discovery", desc: "Pods communicate via service names" },
        { label: "Port Mapping", desc: "Different port configurations per service type" }
      ]
    },
    {
      title: "📋 Deployment Commands",
      code: `# Deploy web tier
kubectl apply -f 08.01.web_deployment.yml
kubectl apply -f 08.00.web_service_NodePort.yml

# Deploy API tier
kubectl apply -f 08.03.api_deployment.yml
kubectl apply -f 08.02.api_service_ClusterIP.yml

# Check services
kubectl get services

# Check deployments
kubectl get deployments

# Access web frontend
# http://<node-ip>:30080

# Test internal API service
kubectl run test-pod --image=busybox -it --rm -- wget -qO- http://api-service:8080

# Clean up
kubectl delete -f .`
    }
  ]
};