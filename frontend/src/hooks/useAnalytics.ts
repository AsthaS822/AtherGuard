import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase";
import { doc, onSnapshot, collection, query, where, limit } from "firebase/firestore";

export const useAnalytics = () => {
  const [data, setData] = useState<{ stats: any, recentLogs: any[] }>({ stats: null, recentLogs: [] });

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const statsRef = doc(db, "analytics", user.uid);
    const unsubStats = onSnapshot(statsRef, (doc) => {
      setData(prev => ({ ...prev, stats: doc.data() }));
    });

    const logsRef = collection(db, "logs");
    const q = query(logsRef, where("userId", "==", user.uid), limit(10));
    const unsubLogs = onSnapshot(q, (snapshot) => {
      let logs = snapshot.docs.map(d => ({ id: d.id, ...d.data() as any }));
      // Sort locally to avoid Firebase composite index requirements
      logs = logs.sort((a, b) => {
          const t1 = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const t2 = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return t2 - t1;
      });
      setData(prev => ({ ...prev, recentLogs: logs }));
    });

    return () => {
      unsubStats();
      unsubLogs();
    };
  }, []);

  return data;
};
