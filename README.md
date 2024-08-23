# Kubernetes Learning Projects

🚢 **Personal study repository documenting my Kubernetes learning journey**

This repository contains my Kubernetes study materials, including YAML configurations and interactive visualizations, created while following the [Udemy Kubernetes course](https://www.udemy.com/course/learn-kubernetes). The content progresses from basic concepts to complex multi-service applications.

## 🎯 Repository Overview

1. **Browse Projects**: Open `index.html` in your browser for interactive navigation
2. **Deploy Examples**: Use `kubectl apply -f <project-folder>/` to deploy configurations
3. **View Diagrams**: Each project has an interactive `diagram.html` page
4. **Study Sequence**: Numbered sequence (01 → 10) follows my learning progression

## 📁 Repository Structure

The repository is organized into separate numbered folders, each containing a complete mini-project:

### 🔰 Basic Resources (01-06)
- **`01-basic-pod/`** - Fundamental Pod concept
  - `01.pod.yml` - Simple pod with nginx container
  - `diagram.html` - Interactive architecture visualization
  - `diagram.js` - Mermaid diagram source

- **`02-nginx-pod/`** - Extended Pod configuration  
  - `02.nginx.yml` - Pod with custom nginx settings

- **`03-replication-controller/`** - High availability with replicas
  - `03.replication_controller.yml` - Managing 3 pod replicas

- **`04-replica-set/`** - Modern replacement for ReplicationController
  - `04.00.replica_set.yml` - ReplicaSet with advanced selectors
  - `04.01.extra_pod.yml` - Independent pod example

- **`05-deployment/`** - Declarative application deployment
  - `05.deployment.yml` - Deployment with rolling updates

- **`06-update-rollback/`** - Update strategies and rollbacks
  - `06.update_rollback.yml` - Recreate strategy with revision history

### 🌐 Services and Networking (07-08)
- **`07-service-nodeport/`** - External access patterns
  - `07.00.service_NodePort.yml` - NodePort service configuration
  - `07.01.pod_deployment.yml` - Pod deployment for the service

- **`08-web-api-services/`** - Multi-tier service architecture
  - `08.00.web_service_NodePort.yml` - Frontend NodePort service
  - `08.01.web_deployment.yml` - nginx proxy frontend
  - `08.02.api_service_ClusterIP.yml` - Backend ClusterIP service  
  - `08.03.api_deployment.yml` - Echo server backend

### 🏗️ Complex Applications (09-10)
- **`09-voting-app/`** - Complete microservices application (Pod-based)
  - `09.00.voting-app-pod.yml` - Python Flask voting frontend
  - `09.00.voting-service.yml` - Voting service configuration
  - `09.01.result-app-pod.yml` - Node.js results display
  - `09.01.result-service.yml` - Results service configuration
  - `09.02.worker-app-pod.yml` - .NET Core vote processor
  - `09.03.redis-pod.yml` - Redis cache for temporary votes
  - `09.03.redis-service.yml` - Redis service configuration
  - `09.04.postgres-pod.yml` - PostgreSQL database
  - `09.04.postgres-service.yml` - PostgreSQL service configuration

- **`10-voting-app-deployment/`** - Enhanced voting application (Deployment-based)
  - `10.00.voting-app-deployment.yml` - Python Flask voting frontend with replicas
  - `10.00.voting-service.yml` - Voting service configuration
  - `10.01.result-app-deployment.yml` - Node.js results display with replicas
  - `10.01.result-service.yml` - Results service configuration
  - `10.02.worker-app-deployment.yml` - .NET Core vote processor with replicas
  - `10.03.redis-deployment.yml` - Redis cache deployment
  - `10.03.redis-service.yml` - Redis service configuration
  - `10.04.postgres-deployment.yml` - PostgreSQL database deployment
  - `10.04.postgres-service.yml` - PostgreSQL service configuration

## 🚀 Common Commands

### Project Deployment
```bash
# Deploy a complete project
kubectl apply -f 01-basic-pod/
kubectl apply -f 08-web-api-services/
kubectl apply -f 09-voting-app/
kubectl apply -f 10-voting-app-deployment/

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

## 🎨 Visual Documentation

Each project includes interactive visualizations following [Kubernetes documentation best practices](https://kubernetes.io/docs/contribute/style/diagram-guide/).

### Interactive Diagrams
- **Main Navigation**: `index.html` - Project overview with complexity levels
- **Individual Projects**: Each folder has `diagram.html` with interactive Mermaid diagrams
- **Project-Specific**: Detailed component descriptions and deployment commands

### Diagram Source Files
- **Mermaid Source**: `diagram.js` files contain the diagram definitions
- **Interactive Loading**: Diagrams load dynamically in HTML pages
- **Educational Focus**: Clear visualization of Kubernetes concepts

### Color Scheme
- **Pods**: Light blue (`#e1f5fe`)
- **Services**: Light green (`#e8f5e8`) / Light purple (`#f3e5f5`) 
- **Controllers**: Light orange (`#fff3e0`) / Light blue (`#e3f2fd`)
- **Data Stores**: Light yellow (`#fff9c4`) / Amber (`#ffecb3`)
- **External Access**: Light orange (`#fff3e0`)
- **Containers**: Light purple (`#f3e5f5`)

## 📊 Generating SVG Diagrams

Convert Mermaid diagrams to SVG using [mermaid-cli](https://github.com/mermaid-js/mermaid-cli):

### Installation
```bash
npm install -g @mermaid-js/mermaid-cli
```

### Generate Individual SVGs
```bash
# Extract diagram code from JS file first
node -e "require('./01-basic-pod/diagram.js'); console.log(diagramCode)" > temp.mmd
mmdc -i temp.mmd -o 01-basic-pod/diagram.svg

# With custom styling  
node -e "require('./09-voting-app/diagram.js'); console.log(diagramCode)" > temp.mmd
mmdc -i temp.mmd -o 09-voting-app/diagram.svg -t default -b white
rm temp.mmd
```

### Batch Generation
```bash
# Windows PowerShell - Extract from JS files
Get-ChildItem -Path . -Filter "*/diagram.js" | ForEach-Object {
    $jsPath = $_.FullName
    $svgPath = $jsPath -replace '\.js$', '.svg'
    node -e "require('$jsPath'); console.log(diagramCode)" > temp.mmd
    mmdc -i temp.mmd -o $svgPath -t default -b white
    Remove-Item temp.mmd
}

# Linux/macOS - Extract from JS files  
find . -name "diagram.js" -exec sh -c 'node -e "require(\"$1\"); console.log(diagramCode)" > temp.mmd && mmdc -i temp.mmd -o "${1%.js}.svg" -t default -b white && rm temp.mmd' _ {} \;
```

### Configuration Options
- `-t, --theme`: Theme selection (default, forest, dark, neutral)
- `-b, --backgroundColor`: Background color
- `-w, --width` / `-H, --height`: Output dimensions
- `-c, --configFile`: Custom configuration file

## 🏛️ Architecture Progression

This repository demonstrates Kubernetes concepts in logical progression:

1. **Pods** (01-02): Basic container deployment units
2. **Controllers** (03-04): Managing pod replicas and lifecycle
3. **Deployments** (05-06): Declarative application management with updates
4. **Services** (07-08): Network access and load balancing
5. **Microservices** (09): Complex multi-service applications

### Key Learning Patterns
- **Service Types**: NodePort for external access, ClusterIP for internal communication
- **Data Flow**: Request routing through multiple service tiers
- **Scaling**: Horizontal pod scaling and load distribution
- **Updates**: Rolling updates vs. recreate strategies
- **Labels**: Selector-based resource management

### Example Architectures
- **Simple (01-06)**: Single pods → Replicated pods → Managed deployments
- **Networked (07-08)**: External access → Frontend/backend separation
- **Pod-based Microservices (09)**: Voting App → Redis → Worker → PostgreSQL → Results App
- **Deployment-based Microservices (10)**: Scalable voting application with replicas and rolling updates

## 🎓 My Learning Path

### Beginner Phase (Projects 01-03)
- Understanding pods as fundamental units
- Learning container specifications
- Exploring replica management

### Intermediate Phase (Projects 04-07)  
- Mastering modern controllers (ReplicaSet, Deployment)
- Learning update and rollback strategies
- Understanding service networking

### Advanced Phase (Projects 08-10)
- Implementing multi-tier architectures
- Designing microservices communication
- Managing complex data flows
- Comparing Pod vs. Deployment approaches
- Understanding scaling and high availability patterns

## 🛠️ Development Setup

### Prerequisites
- Kubernetes cluster (minikube, kind, or cloud provider)
- kubectl CLI tool
- Web browser for viewing interactive diagrams

### Optional Tools
- mermaid-cli for SVG generation
- VS Code with Mermaid preview extension
- Docker for local container experimentation

## 📚 Additional Resources

### Viewing Options
- **Local**: Open HTML files directly in browser
- **Online**: [Mermaid Live Editor](https://mermaid.live/) for diagram code from .js files
- **GitHub**: Native Mermaid rendering in markdown files
- **IDE**: Extensions for VS Code, IntelliJ, Vim

### Kubernetes Documentation
- [Official Kubernetes Docs](https://kubernetes.io/docs/)
- [Kubectl Reference](https://kubernetes.io/docs/reference/kubectl/)
- [YAML Configuration](https://kubernetes.io/docs/concepts/configuration/)

---

## 🎯 Project Organization Philosophy

Each numbered folder represents a **complete study module** from my learning journey:

- **Independence**: Each project can be deployed separately
- **Progression**: Numbered sequence follows my learning progression through the course
- **Completeness**: All necessary files contained within each folder
- **Documentation**: Every project includes visual and textual documentation

This structure reflects both **sequential learning** and serves as **reference material** for specific Kubernetes concepts I've studied.

## 📁 File Structure Per Module
Each module contains exactly these files:
```
XX-module-name/
├── XX.module.yml          # Kubernetes YAML configuration
├── diagram.html           # Interactive visualization page
└── diagram.js             # Mermaid diagram definition
```

**🚀 Explore my Kubernetes study materials: Open `index.html` to browse the interactive project gallery!**