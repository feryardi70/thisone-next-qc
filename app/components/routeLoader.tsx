import { Loader2, Shield } from "lucide-react"

export function ProtectedRouteLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
      <div className="relative">
        <Shield className="h-32 w-32 text-primary/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Loading...</h3>
        <p className="text-sm text-muted-foreground">Please wait while we authenticate your session...</p>
      </div>
    </div>
  )
}