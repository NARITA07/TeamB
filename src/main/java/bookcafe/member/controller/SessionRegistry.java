package bookcafe.member.controller;

import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSession;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SessionRegistry {

    private final ConcurrentHashMap<String, HttpSession> activeSessions = new ConcurrentHashMap<>();

    public HttpSession getSession(String userId) {
        return activeSessions.get(userId);
    }

    public void registerSession(String userId, HttpSession session) {
        activeSessions.put(userId, session);
    }

    public void removeSession(String userId) {
        activeSessions.remove(userId);
    }

    public void invalidateSession(String userId) {
        HttpSession session = activeSessions.get(userId);
        if (session != null) {
            session.invalidate();
            activeSessions.remove(userId);
        }
    }
}
