const diagramCode = `graph TB
    subgraph "Kubernetes Cluster"
        subgraph "Node"
            subgraph "Pod: nginx-2"
                C[nginx Container<br/>Port 80<br/>Custom Config]
            end
        end
    end
    
    style Pod fill:#e1f5fe
    style C fill:#e1f5fe`;