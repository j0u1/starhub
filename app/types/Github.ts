export interface GithubRepo {
  id: number
  name: string
  html_url: string
  homepage?: string
  description: string | null
  stargazers_count: number
  owner: {
    login: string
    avatar_url: string
  }
}
