import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase";
import { 
  collection, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  limit 
} from "firebase/firestore";

export const useAnalytics = () => {
  const [data, setData] = useState<{ stats: any, recentLogs: any[] }>({ 
    stats: {
      totalScanned: 0,
      toxicCount: 0,
      safeCount: 0,
      spamCount: 0,
      abusiveCount: 0,
      threatCount: 0,
      suspiciousCount: 0
    }, 
    recentLogs: [] 
  });

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // Stats sync
    const scansRef = collection(db, "users", user.uid, "scans");
    const unsubStats = onSnapshot(scansRef, (snapshot) => {
      const stats = {
        totalScanned: 0,
        toxicCount: 0,
        safeCount: 0,
        spamCount: 0,
        abusiveCount: 0,
        threatCount: 0,
        suspiciousCount: 0
      };

      snapshot.docs.forEach(doc => {
        const d = doc.data();
        stats.totalScanned += (d.totalScannedItems || 0);
        stats.toxicCount += (d.toxicCount || 0);
        stats.safeCount += (d.safeCount || 0);
        stats.spamCount += (d.spamCount || 0);
        stats.abusiveCount += (d.abusiveCount || 0);
        stats.threatCount += (d.threatCount || 0);
        stats.suspiciousCount += (d.suspiciousCount || 0);
      });

      setData(prev => ({ ...prev, stats }));
    });

    // Live logs sync
    const logsRef = collection(db, "logs");
    const q = query(
      logsRef, 
      where("userId", "==", user.uid), 
      orderBy("createdAt", "desc"), 
      limit(5)
    );

    const unsubLogs = onSnapshot(q, (snapshot) => {
      const logs = snapshot.docs.map(d => ({ id: d.id, ...d.data() as any }));
      setData(prev => ({ ...prev, recentLogs: logs }));
    }, (err) => {
        console.warn("Live feed subscription error:", err.message);
    });

    return () => {
      unsubStats();
      unsubLogs();
    };
  }, []);

  return data;
};
