
resource "aws_eks_cluster" "voting_app" {
  name     = "example-voting-app"
  version  = "1.33"
  role_arn = aws_iam_role.eks_cluster_role.arn

  access_config {
    authentication_mode = "API"
  }

  vpc_config {
    subnet_ids = [aws_subnet.public_1.id, aws_subnet.public_2.id, aws_subnet.private_1.id, aws_subnet.private_2.id]
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_cluster_policy
  ]
}

resource "aws_eks_node_group" "demo-workers" {
  cluster_name    = aws_eks_cluster.voting_app.name
  node_group_name = "demo-workers"
  node_role_arn   = aws_iam_role.eks_node_group_role.arn
  subnet_ids      = [aws_subnet.private_1.id, aws_subnet.private_2.id]

  scaling_config {
    desired_size = 2
    max_size     = 2
    min_size     = 2
  }

  update_config {
    max_unavailable = 1
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_worker_node_policy,
    aws_iam_role_policy_attachment.eks_cni_policy,
    aws_iam_role_policy_attachment.eks_container_registry_policy,
    aws_eks_cluster.voting_app
  ]
}

resource "aws_eks_access_entry" "admin_access" {
  cluster_name  = aws_eks_cluster.voting_app.name
  principal_arn = data.aws_iam_session_context.current.issuer_arn
  type          = "STANDARD"
}

resource "aws_eks_access_policy_association" "admin_policy" {
  cluster_name  = aws_eks_cluster.voting_app.name
  principal_arn = aws_eks_access_entry.admin_access.principal_arn
  policy_arn    = local.eks_cluster_admin_policy_arn

  access_scope {
    type = "cluster"
  }
}
