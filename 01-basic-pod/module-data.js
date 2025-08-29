window.moduleData = {
  id: "01-basic-pod",
  projectNumber: "01",
  title: "Basic Pod",
  complexity: "basic",
  description: "Introduction to Kubernetes pods - the fundamental deployment unit. Learn how to create a simple pod with an nginx container.",
  pageTitle: "01 - Basic Pod Architecture",
  headerIcon: "📦",
  headerTitle: "Basic Pod Architecture",
  headerDesc: "Introduction to Kubernetes pods - the fundamental deployment unit",
  navPrev: null,
  navNext: "02-nginx-pod",
  infoCards: [
    {
      title: "🏗️ Components",
      components: [
        { label: "Pod", desc: "Basic deployment unit containing a single nginx container" },
        { label: "Container", desc: "nginx web server running on port 80" },
        { label: "Scope", desc: "Demonstrates fundamental Kubernetes pod concept" }
      ]
    },
    {
      title: "🎯 Key Concepts",
      components: [
        { label: "Pods", desc: "Smallest deployable units in Kubernetes" },
        { label: "IP Address", desc: "Each pod gets its own IP address" },
        { label: "Network", desc: "Containers in a pod share the same network namespace" }
      ]
    },
    {
      title: "📋 Deployment Commands",
      code: `# Deploy the pod
kubectl apply -f 01.pod.yml

# Check pod status
kubectl get pods

# Describe the pod
kubectl describe pod myapp-pod

# Delete the pod
kubectl delete -f 01.pod.yml`
    }
  ]
};