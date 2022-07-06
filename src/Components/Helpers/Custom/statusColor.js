export const statusColor = (value, badge) => {
  if (badge) {
    switch (value) {
      case "active":
        return "badge-success badge-soft-success"
      case "inactive":
        return "badge-danger badge-soft-danger"
      case "invited":
        return "badge-warning badge-soft-warning"
      default:
        return ""
    }
  } else {
    switch (value) {
      case "active":
        return "btn-success"
      case "inactive":
        return "btn-danger"
      case "invited":
        return "btn-warning"
      default:
        return ""
    }
  }
}
