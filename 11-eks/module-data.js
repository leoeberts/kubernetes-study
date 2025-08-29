window.moduleData = {
  id: "11-eks",
  projectNumber: "11",
  title: "AWS EKS Voting Application",
  complexity: "advanced",
  description: "Cloud-native deployment using AWS EKS with Terraform infrastructure provisioning and LoadBalancer services for external access.",
  pageTitle: "11 - AWS EKS Voting Application",
  headerIcon: "☁️",
  headerTitle: "Project 11: AWS EKS Voting Application",
  headerDesc: "Cloud-native deployment using AWS EKS with Terraform infrastructure and LoadBalancer services",
  navPrev: "10-voting-app-deployment",
  navNext: null,
  multiDiagram: true,
  infoCards: [
    {
      title: "🏗️ Infrastructure Components",
      components: [
        { label: "EKS Cluster", desc: "Managed Kubernetes cluster (example-voting-app, v1.33)" },
        { label: "Node Group", desc: "2 worker nodes (demo-workers) in private subnets" },
        { label: "VPC", desc: "Multi-AZ setup with public/private subnets" },
        { label: "NAT Gateways", desc: "Outbound internet access for private subnets" },
        { label: "IAM Roles", desc: "EKS cluster and node group permissions" }
      ]
    },
    {
      title: "🌐 Application Services",
      components: [
        { label: "Vote Service", desc: "LoadBalancer for external voting access" },
        { label: "Result Service", desc: "LoadBalancer for external results viewing" },
        { label: "Redis Service", desc: "ClusterIP 6379 for internal cache access" },
        { label: "DB Service", desc: "ClusterIP 5432 for internal database access" }
      ]
    },
    {
      title: "☁️ Cloud-Native Benefits",
      features: [
        "Managed Control Plane: AWS manages Kubernetes API server, etcd, and controllers",
        "Auto-scaling: Node groups can automatically scale based on demand",
        "Load Balancers: Automatic AWS ELB provisioning for LoadBalancer services",
        "Security: IAM integration with Kubernetes RBAC",
        "High Availability: Multi-AZ deployment across availability zones"
      ]
    },
    {
      title: "💻 Technology Stack",
      technologies: ["AWS EKS", "Terraform", "Docker", "Redis 7", "PostgreSQL 15", "LoadBalancer", "VPC"]
    },
    {
      title: "📋 Deployment Commands",
      code: `# Deploy infrastructure
cd terraform/
terraform init
terraform apply

# Configure kubectl
aws eks update-kubeconfig --region eu-central-1 --name example-voting-app

# Deploy application
cd ../k8s/
kubectl apply -f .

# Check EKS cluster
kubectl get nodes

# Get LoadBalancer URLs
kubectl get services vote result

# Scale deployments
kubectl scale deployment vote --replicas=3

# Cleanup
kubectl delete -f .
cd ../terraform/
terraform destroy`
    }
  ]
};