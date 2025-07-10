export class CreateTemplateRequest {
  title = ''
  description = ''
  version = 1
  clauses = []
}

export class CreateTemplateClause {
  header = ''
  shortName = ''
  description = ''
  required = false
}
