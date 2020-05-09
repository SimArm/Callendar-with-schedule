<?php

class DBfunctions
{
    private $host;
    private $dbname;
    private $user;
    private $password;
    private $conn;

    public function __construct(
        $host = 'localhost',
        $dbname = 'schedule_db',
        $user = 'kcs_user',
        $password = 'pass'
    )
    {
        $this->host = $host;
        $this->dbname = $dbname;
        $this->user = $user;
        $this->password = $password;

        if (!$this->conn){
            $this->conn = new \PDO("mysql:host=$host; dbname=$dbname", $user, $password);
        }
    }

    public function getDataById($id)
    {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE id = $id");
        $stmt->execute();
        $stmt->setFetchMode(\PDO::FETCH_ASSOC);

        return $stmt->fetch();
    }

    public function getDataByUsername($username)
    {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE username = '$username'");
        $stmt->execute();
        $stmt->setFetchMode(\PDO::FETCH_ASSOC);

        return $stmt->fetch();
    }

    public function insertUser(array $mas){
        $stmt = $this->conn->prepare("INSERT INTO users (name,email,username,password) VALUES ( :name, :email, :username, :password)");
        $stmt->bindValue(':name', $mas['name']);
        $stmt->bindValue(':email', $mas['email']);
        $stmt->bindValue(':username', $mas['username']);
        $stmt->bindValue(':password', $mas['password']);
        $stmt->execute();
    }

    public function insertEvent(array $value){
        $stmt = $this->conn->prepare("INSERT INTO events (user_id, color, event, time) VALUES ( :user_id, :color, :event, :time)");
        $stmt->bindValue(':user_id', $_SESSION['id']);
        $stmt->bindValue(':color', $value['color']);
        $stmt->bindValue(':event', $value['event']);
        $stmt->bindValue(':time', $value['time']);
        $stmt->execute();
    }

    public function getEvents($id){
        $stmt = $this->conn->prepare("SELECT * FROM events WHERE user_id = '$id'");
        $stmt->execute();
        $stmt->setFetchMode(\PDO::FETCH_ASSOC);
        
        return $stmt->fetchAll();
    }

    public function getEventsByDate($date){
        $stmt = $this->conn->prepare("SELECT * FROM events WHERE date('time') = '$date'");
        $stmt->execute();
        $stmt->setFetchMode(\PDO::FETCH_ASSOC);

        return $stmt->fetchAll();
    }
}

$getData = new DBfunctions();
$jsonEncode = json_encode($getData->getEvents(1));
echo $jsonEncode;