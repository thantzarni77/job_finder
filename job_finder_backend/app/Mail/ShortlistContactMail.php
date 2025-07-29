<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ShortlistContactMail extends Mailable
{
    use Queueable, SerializesModels;

    public $seeker;
    public $job;
    public $employer;
    /**
     * Create a new message instance.
     */
    public function __construct($seeker, $job, $employer)
    {
        $this->seeker = $seeker;
        $this->job = $job;
        $this->employer = $employer;
    }

    public function build()
    {
        return $this->from($this->employer->user->email)
                    ->subject('Thank you for Applied Job')
                    ->view('email.mail_template');
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
