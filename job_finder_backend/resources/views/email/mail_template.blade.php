<p>Dear  {{ $seeker->user->name }}</p>

<b>Reply for Job Code - <strong>{{$job->job_code}}</strong></b>
<p><strong>Congratulations</strong> your are selected for our shortlisted position</p>
<p>We are glad to inform you that your job application has been accepted.</p>
<p>We are looking forward to interview with you.</p>
<br>
<br>
<hr>    
<br>
<p>Best Regards</p>
<br>
@if($employer->company_name == null){
    <h3>{{$employer->user->name}}</h3>
}
@endif
<br>
<h3>{{$employer->company_name }}</h3>
