window.moduleData = {
  id: "04-replica-set",
  projectNumber: "04",
  title: "ReplicaSet Architecture",
  complexity: "intermediate",
  description: "Modern replacement for ReplicationController with advanced selectors",
  pageTitle: "04 - ReplicaSet Architecture",
  headerIcon: "🎯",
  headerTitle: "ReplicaSet Architecture", 
  headerDesc: "Modern replacement for ReplicationController with advanced selectors",
  infoCards: [
    {
      title: "🏗️ Components", 
      components: [
        { label: "ReplicaSet", desc: "myapp-rs managing pod replicas" },
        { label: "Pods", desc: "2 replicas with nginx containers" },
        { label: "Selector", desc: "matchLabels with type: front-end" },
        { label: "Template", desc: "Pod specification for nginx" }
      ]
    },
    {
      title: "🎯 Key Concepts",
      components: [
        { label: "Set-based selectors", desc: "More expressive than equality-based" },
        { label: "Pod management", desc: "Ensures desired replica count" },
        { label: "Label matching", desc: "Uses matchLabels for pod selection" },
        { label: "Modern approach", desc: "Preferred over ReplicationController" }
      ]
    },
    {
      title: "📋 Deployment Commands",
      code: `# Deploy the ReplicaSet
kubectl apply -f 04.00.replica_set.yml

# Check ReplicaSet status
kubectl get rs

# Check pods created
kubectl get pods

# Describe the ReplicaSet
kubectl describe rs myapp-rs

# Scale the ReplicaSet
kubectl scale rs myapp-rs --replicas=3

# Delete the ReplicaSet
kubectl delete rs myapp-rs`
    }
  ]
};