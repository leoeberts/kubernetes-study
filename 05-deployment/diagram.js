const diagramCode = `graph TB
    subgraph "Kubernetes Cluster"
        D[Deployment<br/>Replicas: 3<br/>Strategy: RollingUpdate]
        RS[ReplicaSet<br/>Created by Deployment]
        
        subgraph "Node 1"
            subgraph "Pod 1"
                C1[nginx Container<br/>v1.0]
            end
        end
        
        subgraph "Node 2"
            subgraph "Pod 2"
                C2[nginx Container<br/>v1.0]
            end
        end
        
        subgraph "Node 3"
            subgraph "Pod 3"
                C3[nginx Container<br/>v1.0]
            end
        end
        
        D -->|creates| RS
        RS -.->|manages| Pod1
        RS -.->|manages| Pod2
        RS -.->|manages| Pod3
    end
    
    style D fill:#e8f5e8
    style RS fill:#fff9c4
    style Pod1 fill:#e1f5fe
    style Pod2 fill:#e1f5fe
    style Pod3 fill:#e1f5fe
    style C1 fill:#e1f5fe
    style C2 fill:#e1f5fe
    style C3 fill:#e1f5fe`;