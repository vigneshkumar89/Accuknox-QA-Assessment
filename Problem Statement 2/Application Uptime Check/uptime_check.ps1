$startDatetime=$(kubectl get services backend-service -o=jsonpath='{.metadata.creationTimestamp}')
Write-Output $startDatetime
$startTime=[DateTime]$startDatetime
$endTime=[DateTime]::Now
Write-Output $startTime
Write-Output $endTime
$duration=$endTime-$startTime
Write-Output "Diff in seconds: $duration.Seconds"
