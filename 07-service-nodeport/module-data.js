window.moduleData = {
  id: "07-service-nodeport",
  projectNumber: "07",
  title: "Service NodePort Architecture",
  complexity: "intermediate",
  description: "External access to pods using NodePort service type",
  pageTitle: "07 - Service NodePort Architecture",
  headerIcon: "🌐",
  headerTitle: "Service NodePort Architecture", 
  headerDesc: "External access to pods using NodePort service type",
  infoCards: [
    {
      title: "🏗️ Components", 
      components: [
        { label: "Service", desc: "myapp-service with NodePort type" },
        { label: "NodePort", desc: "External port 30088 for external access" },
        { label: "Pods", desc: "Backend pods exposed via service" },
        { label: "Selector", desc: "myPodLabel: myPodValue for pod selection" }
      ]
    },
    {
      title: "🎯 Key Concepts",
      components: [
        { label: "NodePort Service", desc: "Exposes service on each node's IP at a static port" },
        { label: "External Access", desc: "Service accessible from outside the cluster" },
        { label: "Port Mapping", desc: "Service port 80 → Pod port 80 → Node port 30088" },
        { label: "Load Balancing", desc: "Distributes traffic across backend pods" }
      ]
    },
    {
      title: "📋 Deployment Commands",
      code: `# Deploy the pod
kubectl apply -f 07.01.pod_deployment.yml

# Deploy the NodePort service
kubectl apply -f 07.00.service_NodePort.yml

# Check service status
kubectl get services

# Check service details
kubectl describe service myapp-service

# Access the application
# http://<node-ip>:30088

# Check endpoints
kubectl get endpoints

# Delete resources
kubectl delete -f 07.00.service_NodePort.yml
kubectl delete -f 07.01.pod_deployment.yml`
    }
  ]
};