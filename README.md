# Kubernetes Learning Projects

🚢 **Personal study repository documenting my Kubernetes learning journey**

This repository contains my Kubernetes study materials, including YAML configurations and interactive visualizations, created while following the [Udemy Kubernetes course](https://www.udemy.com/course/learn-kubernetes). The content progresses from basic concepts to complex multi-service applications.

## 🎯 Repository Overview

1. **Browse Projects**: Open `index.html` in your browser for interactive navigation
2. **Deploy Examples**: Use `kubectl apply -f <project-folder>/` to deploy configurations
3. **View Diagrams**: Click "View Diagram" on any project card for interactive visualizations
4. **Study Sequence**: Numbered sequence (01 → 11) follows my learning progression

## 📁 Repository Structure

The repository uses a **centralized system** that eliminates HTML duplication through dynamic module loading:

### 🔧 Shared System
- **`shared/`** - Centralized system serving all projects
  - `project.html` - Universal project template loaded dynamically
  - `project-system.js` - Module discovery, navigation, and rendering system
  - `styles.css` - Project detail page styling with difficulty-based themes
  - `index.css` - Index page styling with complexity-based project cards
- **`index.html`** - Main project gallery with dynamic card generation

### 📦 Module Structure
Each module contains only essential files:
```
XX-module-name/
├── XX.config.yml           # Kubernetes YAML configuration(s)
├── module-data.js          # Project metadata and info cards
└── diagram.js              # Mermaid diagram definition
```

### 🔰 Basic Resources (01-02)
- **`01-basic-pod/`** - Fundamental Pod concept
  - `01.pod.yml` - Simple pod with nginx container
  - `module-data.js` - Project metadata and deployment commands
  - `diagram.js` - Mermaid diagram source

- **`02-nginx-pod/`** - Extended Pod configuration  
  - `02.nginx.yml` - Pod with custom nginx settings (nginx-2)

### 🔧 Intermediate Resources (03-07)
- **`03-replication-controller/`** - High availability with replicas
  - `03.replication_controller.yml` - Managing 3 pod replicas

- **`04-replica-set/`** - Modern replacement for ReplicationController
  - `04.00.replica_set.yml` - ReplicaSet with advanced selectors
  - `04.01.extra_pod.yml` - Independent pod example

- **`05-deployment/`** - Declarative application deployment
  - `05.deployment.yml` - Deployment with rolling updates

- **`06-update-rollback/`** - Update strategies and rollbacks
  - `06.update_rollback.yml` - Recreate strategy with revision history

- **`07-service-nodeport/`** - External access patterns
  - `07.00.service_NodePort.yml` - NodePort service configuration
  - `07.01.pod_deployment.yml` - Pod deployment for the service

### 🌐 Advanced Applications (08-11)
- **`08-web-api-services/`** - Multi-tier service architecture
  - 4 YAML files: Web frontend (NodePort) + API backend (ClusterIP)

- **`09-voting-app/`** - Complete microservices application (Pod-based)
  - 9 YAML files: Voting frontend, Results display, Worker, Redis, PostgreSQL

- **`10-voting-app-deployment/`** - Enhanced voting application (Deployment-based)
  - 9 YAML files: Same architecture using Deployments for scalability

- **`11-eks/`** - AWS EKS voting application with Terraform infrastructure
  - `terraform/` - Infrastructure as Code for EKS cluster
  - `k8s/` - Kubernetes application manifests with LoadBalancer services
  - `terraform-diagram.js` - Additional diagram for infrastructure view

## 🚀 Common Commands

### Project Deployment
```bash
# Deploy a complete project
kubectl apply -f 01-basic-pod/
kubectl apply -f 08-web-api-services/
kubectl apply -f 09-voting-app/
kubectl apply -f 10-voting-app-deployment/
kubectl apply -f 11-eks/k8s/

# Deploy from within a project folder
cd 01-basic-pod/
kubectl apply -f .
```

### Resource Management
```bash
# View resources
kubectl get pods
kubectl get deployments
kubectl get services
kubectl get replicasets

# Check status and logs
kubectl describe pod <pod-name>
kubectl logs <pod-name>

# Delete resources
kubectl delete -f 01-basic-pod/
kubectl delete -f <project-folder>/<filename>.yml
```

### Scaling and Updates
```bash
# Scale deployments
kubectl scale deployment myapp-deployment --replicas=5

# Update images
kubectl set image deployment/myapp-deployment nginx=nginx:1.21

# Rollback deployments
kubectl rollout undo deployment/myapp-deployment
```

### AWS EKS with Terraform (Project 11)
```bash
# Navigate to terraform directory
cd 11-eks/terraform/

# Initialize and plan infrastructure
terraform init
terraform plan

# Deploy EKS cluster
terraform apply

# Configure kubectl
aws eks update-kubeconfig --region eu-central-1 --name example-voting-app

# Deploy application
cd ../k8s/
kubectl apply -f .

# Get LoadBalancer URLs
kubectl get services vote result

# Cleanup
kubectl delete -f .
cd ../terraform/
terraform destroy
```

## 🎨 Interactive Documentation System

The repository features a **centralized documentation system** that automatically discovers and renders all projects:

### Main Navigation
- **`index.html`** - Dynamic project gallery showing:
  - Interactive project cards with complexity-based styling (Basic/Intermediate/Advanced)  
  - Automatic module discovery (no hardcoded project lists)
  - Direct links to interactive diagrams and project files
  - Key learning concepts overview

### Project Details
- **`shared/project.html`** - Universal template serving all projects via URL parameters
- **Dynamic Loading**: `shared/project.html?module=01-basic-pod`
- **Automatic Navigation**: Previous/next links generated dynamically
- **Interactive Diagrams**: Mermaid diagrams with zoom/pan controls

### Module Data Structure
Each `module-data.js` contains:
- Project metadata (title, complexity, description)
- Interactive info cards (Components, Key Concepts, Deployment Commands)
- Multi-diagram support (e.g., Kubernetes + Terraform views)

### Complexity-Based Styling
- **Basic (01-02)**: Green theme - Foundation concepts
- **Intermediate (03-07)**: Yellow theme - Controllers and services  
- **Advanced (08-11)**: Red theme - Complex applications and cloud deployment

## 🏛️ Architecture Progression

This repository demonstrates Kubernetes concepts in logical progression:

1. **Pods** (01-02): Basic container deployment units
2. **Controllers** (03-04): Managing pod replicas and lifecycle  
3. **Deployments** (05-06): Declarative application management with updates
4. **Services** (07-08): Network access and load balancing
5. **Microservices** (09-10): Complex multi-service applications
6. **Cloud-Native** (11): AWS EKS with Terraform infrastructure

### Key Learning Patterns
- **Service Types**: NodePort for external access, ClusterIP for internal communication
- **Data Flow**: Request routing through multiple service tiers
- **Scaling**: Horizontal pod scaling and load distribution  
- **Updates**: Rolling updates vs. recreate strategies
- **Labels**: Selector-based resource management
- **Cloud Integration**: Managed Kubernetes services with LoadBalancers

## 🛠️ Development Setup

### Prerequisites
- Kubernetes cluster (minikube, kind, or cloud provider)
- kubectl CLI tool
- Web browser for viewing interactive diagrams
- **For Project 11**: Terraform, AWS CLI, AWS account with EKS permissions

### Viewing Documentation
- **Local**: Open `index.html` directly in browser (works with file:// protocol)
- **Project Details**: Click "View Diagram" on any project card
- **Direct Access**: Navigate to `shared/project.html?module=XX-module-name`

## 🎓 Adding New Modules

The system automatically discovers new modules. To add a module:

1. **Create Directory**: `12-new-module/`
2. **Add Module Data**: Create `module-data.js` with project metadata
3. **Add Diagram**: Create `diagram.js` with Mermaid diagram
4. **Add YAML**: Include Kubernetes configuration files
5. **Test**: System automatically discovers and displays the new module

Example `module-data.js` structure:
```javascript
window.moduleData = {
  id: "12-new-module",
  projectNumber: "12", 
  title: "New Module",
  complexity: "basic|intermediate|advanced",
  description: "Module description",
  pageTitle: "12 - New Module",
  headerIcon: "🎯",
  headerTitle: "New Module",
  headerDesc: "Description", 
  infoCards: [
    {
      title: "🏗️ Components",
      components: [
        { label: "Resource", desc: "Description" }
      ]
    },
    {
      title: "📋 Deployment Commands", 
      code: `kubectl apply -f 12-new-module/`
    }
  ]
};
```

## 📊 System Benefits

### Centralized Architecture
- **Zero HTML Duplication**: Single template serves all projects
- **Dynamic Discovery**: Automatically finds new modules  
- **Consistent Styling**: Complexity-based themes applied automatically
- **Easy Maintenance**: Update one file, affects all projects
- **Fast Loading**: Shared resources cached by browser

### Educational Focus
- **Progressive Complexity**: Clear learning path from basic to advanced
- **Interactive Diagrams**: Visual understanding of architectures
- **Complete Examples**: All necessary files included per module
- **Real Commands**: Copy-paste deployment instructions

---

**🚀 Explore my Kubernetes study materials: Open `index.html` to browse the interactive project gallery!**