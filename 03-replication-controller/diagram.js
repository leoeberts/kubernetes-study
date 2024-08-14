const diagramCode = `graph TB
    subgraph "Kubernetes Cluster"
        RC[ReplicationController<br/>Replicas: 3<br/>Selector: app=myapp]
        
        subgraph "Node 1"
            subgraph "Pod 1"
                C1[nginx Container<br/>app=myapp]
            end
        end
        
        subgraph "Node 2"
            subgraph "Pod 2"
                C2[nginx Container<br/>app=myapp]
            end
        end
        
        subgraph "Node 3"
            subgraph "Pod 3"
                C3[nginx Container<br/>app=myapp]
            end
        end
        
        RC -.->|manages| Pod1
        RC -.->|manages| Pod2
        RC -.->|manages| Pod3
    end
    
    style RC fill:#e8f5e8
    style Pod1 fill:#e1f5fe
    style Pod2 fill:#e1f5fe
    style Pod3 fill:#e1f5fe
    style C1 fill:#e1f5fe
    style C2 fill:#e1f5fe
    style C3 fill:#e1f5fe`;