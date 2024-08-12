const diagramCode = `graph TB
    subgraph "Kubernetes Cluster"
        subgraph "Node"
            subgraph "Pod"
                C[nginx Container<br/>Port 80]
            end
        end
    end
    
    style Pod fill:#e1f5fe
    style C fill:#e1f5fe`;