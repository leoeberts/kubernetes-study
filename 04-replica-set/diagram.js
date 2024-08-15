const diagramCode = `graph TB
    subgraph "Kubernetes Cluster"
        RS[ReplicaSet<br/>Replicas: 3<br/>Selector: matchLabels]
        
        subgraph "Node 1"
            subgraph "Pod 1"
                C1[nginx Container<br/>Labels: app=myapp]
            end
            subgraph "Extra Pod"
                EC[nginx Container<br/>Independent Pod]
            end
        end
        
        subgraph "Node 2"
            subgraph "Pod 2"
                C2[nginx Container<br/>Labels: app=myapp]
            end
        end
        
        subgraph "Node 3"
            subgraph "Pod 3"
                C3[nginx Container<br/>Labels: app=myapp]
            end
        end
        
        RS -.->|manages| Pod1
        RS -.->|manages| Pod2
        RS -.->|manages| Pod3
    end
    
    style RS fill:#e8f5e8
    style Pod1 fill:#e1f5fe
    style Pod2 fill:#e1f5fe
    style Pod3 fill:#e1f5fe
    style ExtraPod fill:#fff3e0
    style C1 fill:#e1f5fe
    style C2 fill:#e1f5fe
    style C3 fill:#e1f5fe
    style EC fill:#e1f5fe`;