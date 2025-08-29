window.moduleData = {
  id: "02-nginx-pod",
  projectNumber: "02",
  title: "Nginx Pod",
  complexity: "basic",
  description: "Extended pod example with custom nginx configuration. Learn how to create pods with specific container settings and resource specifications.",
  pageTitle: "02 - Nginx Pod Architecture",
  headerIcon: "🌐",
  headerTitle: "Nginx Pod Architecture",
  headerDesc: "Extended pod example with custom nginx configuration",
  infoCards: [
    {
      title: "🏗️ Components",
      components: [
        { label: "Pod", desc: "Named nginx-pod with custom configuration" },
        { label: "Container", desc: "nginx web server with specific settings" },
        { label: "Scope", desc: "Extended pod example with custom nginx configuration" }
      ]
    },
    {
      title: "🎯 Key Concepts",
      components: [
        { label: "Pod Naming", desc: "Pods can have custom names and labels" },
        { label: "Customization", desc: "Container configuration within pods" },
        { label: "Resources", desc: "Resource specification basics" }
      ]
    },
    {
      title: "📋 Deployment Commands",
      code: `# Deploy the nginx pod
kubectl apply -f 02.nginx.yml

# Check pod status
kubectl get pods

# Get pod details
kubectl describe pod nginx-pod

# Delete the pod
kubectl delete -f 02.nginx.yml`
    }
  ]
};