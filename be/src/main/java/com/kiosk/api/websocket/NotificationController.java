package com.kiosk.api.websocket;

import com.kiosk.api.websocket.Notification;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class NotificationController {

    @MessageMapping("/notify")
    @SendTo("/topic/notifications")
    public Notification send(Notification notification) {
        return notification;
    }

}
