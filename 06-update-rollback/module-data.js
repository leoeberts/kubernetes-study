window.moduleData = {
  id: "06-update-rollback",
  projectNumber: "06",
  title: "Update & Rollback Architecture",
  complexity: "intermediate",
  description: "Deployment strategies and rollback mechanisms",
  pageTitle: "06 - Update & Rollback Architecture",
  headerIcon: "🔄",
  headerTitle: "Update & Rollback Architecture", 
  headerDesc: "Deployment strategies and rollback mechanisms",
  infoCards: [
    {
      title: "🏗️ Components", 
      components: [
        { label: "Deployment", desc: "myapp-deployment with Recreate strategy" },
        { label: "Strategy", desc: "Recreate (terminates all pods before creating new ones)" },
        { label: "Pods", desc: "2 replicas with nginx:1.12.2 containers" },
        { label: "Rollout", desc: "Complete replacement of all pods" }
      ]
    },
    {
      title: "🎯 Key Concepts",
      components: [
        { label: "Recreate Strategy", desc: "Terminates all old pods before creating new ones" },
        { label: "Downtime", desc: "Brief unavailability during updates" },
        { label: "Rollback", desc: "Revert to previous deployment version" },
        { label: "Revision History", desc: "Track deployment changes" }
      ]
    },
    {
      title: "📋 Deployment Commands",
      code: `# Deploy the deployment
kubectl apply -f 06.update_rollback.yml

# Check deployment status
kubectl get deployments

# Check rollout status
kubectl rollout status deployment/myapp-deployment

# View rollout history
kubectl rollout history deployment/myapp-deployment

# Update image (triggers recreate)
kubectl set image deployment/myapp-deployment nginx-container=nginx:1.14

# Rollback to previous version
kubectl rollout undo deployment/myapp-deployment

# Rollback to specific revision
kubectl rollout undo deployment/myapp-deployment --to-revision=2`
    }
  ]
};