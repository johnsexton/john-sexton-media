<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS);

    if (!$name || !$email || !$message || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response = array(
            'status' => 'error',
            'message' => 'Please enter a valid name, email, and message'
        );
        echo json_encode($response);
        exit;
    }

    $to = 'johnsextonmedia@gmail.com';
    $subject = 'New contact form submission';
    $body = "Name: $name\nEmail: $email\nMessage:\n$message";

    if (mail($to, $subject, $body)) {
        $response = array(
            'status' => 'success',
            'message' => 'Thank you for your message!'
        );
        echo json_encode($response);
    } else {
        $response = array(
            'status' => 'error',
            'message' => 'Something went wrong. Please try again later.'
        );
        echo json_encode($response);
    }
}
