const terraformDiagramCode = `graph TB
    subgraph "AWS Account"
        subgraph "VPC - Multi-AZ Setup"
            subgraph "Availability Zone 1"
                PUB1[Public Subnet<br/>NAT Gateway 1]
                PRIV1[Private Subnet<br/>EKS Workers]
            end
            
            subgraph "Availability Zone 2"
                PUB2[Public Subnet<br/>NAT Gateway 2]
                PRIV2[Private Subnet<br/>EKS Workers]
            end
            
            IGW[Internet Gateway<br/>Public Access]
        end
        
        subgraph "EKS Control Plane"
            MASTER[EKS Cluster<br/>example-voting-app<br/>v1.33<br/>Managed by AWS]
        end
        
        subgraph "EKS Node Group"
            NODES[demo-workers<br/>2 EC2 Instances<br/>Private Subnets Only]
        end
        
        subgraph "Load Balancers"
            ALB[Application Load Balancer<br/>Auto-provisioned<br/>by LoadBalancer Services]
        end
        
        subgraph "IAM Resources"
            CLUSTER_ROLE[EKS Cluster Role<br/>AmazonEKSClusterPolicy]
            WORKER_ROLE[Node Group Role<br/>AmazonEKSWorkerNodePolicy<br/>AmazonEKS_CNI_Policy<br/>AmazonEC2ContainerRegistryReadOnly]
            ACCESS[Admin Access Entry<br/>Cluster Admin Policy]
        end
    end
    
    subgraph "Terraform State"
        BACKEND[S3 Backend<br/>State Management]
    end
    
    IGW --> PUB1
    IGW --> PUB2
    PUB1 --> PRIV1
    PUB2 --> PRIV2
    
    MASTER -.-> PRIV1
    MASTER -.-> PRIV2
    NODES -.-> PRIV1
    NODES -.-> PRIV2
    
    ALB --> IGW
    ALB -.-> NODES
    
    MASTER --> CLUSTER_ROLE
    NODES --> WORKER_ROLE
    MASTER --> ACCESS
    
    style IGW fill:#fff3e0
    style PUB1 fill:#e8f5e8
    style PUB2 fill:#e8f5e8
    style PRIV1 fill:#f3e5f5
    style PRIV2 fill:#f3e5f5
    style MASTER fill:#ffecb3
    style NODES fill:#e1f5fe
    style ALB fill:#fff9c4
    style CLUSTER_ROLE fill:#f3e5f5
    style WORKER_ROLE fill:#f3e5f5
    style ACCESS fill:#f3e5f5
    style BACKEND fill:#fff3e0`;

// Make the diagram code available globally
if (typeof window !== 'undefined') {
    window.terraformDiagramCode = terraformDiagramCode;
}

// For Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { terraformDiagramCode };
}