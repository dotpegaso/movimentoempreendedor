<?php
    header("Access-Control-Allow-Origin: *");
    
    $user = json_decode(file_get_contents("php://input"));
    
    $data = [
        'email'     => $user->email, 
        'nome'     => $user->nome, 
        'empresa'     => $user->empresa, 
        'segmento'     => $user->segmento, 
        'status'    => 'subscribed' // possíveis status: subscribed, unsubscribed, cleaned, pending
    ];
    
    function syncMailchimp($data, $list) {
        $apiKey = '_INSERT_';
        $listId = $list; // id da lista que deverá receber o email
    
        $memberId = md5(strtolower($data['email']));
        $dataCenter = substr($apiKey,strpos($apiKey,'-')+1);
        $url = 'https://' . $dataCenter . '.api.mailchimp.com/3.0/lists/' . $listId . '/members/' . $memberId;
    
        $json = json_encode([
            'email_address' => $data['email'],
            'status'        => $data['status'] 
            // referência completa: http://developer.mailchimp.com/documentation/mailchimp/reference/lists/members
        ]);
    
        $ch = curl_init($url);
    
        curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $apiKey);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $json);                                                                                                                 
    
        $result = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
    
        $result_json = json_decode($result);
        
        if($result_json->status == 400){
            echo "false";
        }else{
            echo "true";
        }
    }
    
    switch ($user->type) {
        
        case 'wishlist':
            $code = 'fb19ed9fc0';
            break;
        
        default:
            //...
            break;
    }
    
    syncMailchimp($data, $code);
?>