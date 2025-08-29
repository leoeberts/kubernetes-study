window.moduleData = {
  id: "03-replication-controller",
  projectNumber: "03",
  title: "ReplicationController",
  complexity: "intermediate",
  description: "High availability through pod replication. Learn how ReplicationControllers ensure desired number of pod replicas are running.",
  pageTitle: "03 - ReplicationController Architecture",
  headerIcon: "🔄",
  headerTitle: "ReplicationController Architecture",
  headerDesc: "High availability through pod replication and automatic healing",
  infoCards: [
    {
      title: "🏗️ Components",
      components: [
        { label: "ReplicationController", desc: "Ensures 3 nginx pods are always running" },
        { label: "Pod Replicas", desc: "3 identical nginx containers across different nodes" },
        { label: "High Availability", desc: "Automatic pod recreation on failure" }
      ]
    },
    {
      title: "🎯 Key Concepts",
      components: [
        { label: "Replication", desc: "Maintains desired number of pod replicas" },
        { label: "Selectors", desc: "Uses labels to identify managed pods" },
        { label: "Self-healing", desc: "Automatically replaces failed pods" }
      ]
    },
    {
      title: "📋 Deployment Commands",
      code: `# Deploy the ReplicationController
kubectl apply -f 03.replication_controller.yml

# Check ReplicationController status
kubectl get rc

# Check pods
kubectl get pods

# Scale the ReplicationController
kubectl scale rc myapp-rc --replicas=5

# Delete a pod (watch it recreate)
kubectl delete pod [pod-name]

# Clean up
kubectl delete -f 03.replication_controller.yml`
    }
  ]
};