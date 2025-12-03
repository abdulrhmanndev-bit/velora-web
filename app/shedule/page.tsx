'use client'
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function TimePage() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    // تطبيق ستايل صورة الخلفية من صفحة تسجيل الدخول
    
    <div
        className="min-h-screen w-full px-6 py-10 text-green-300"
      style={{
        backgroundImage: "url('/bg-img/home.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      
      <div className="absolute inset-0 bg-black/60  px-6 py-30">
      {/* العنوان: استخدام لون النيون text-green-400 */}
      <h1 className="text-4xl font-bold text-center mb-10 text-orange-400 drop-shadow-[0_0_15px_rgba(25,255,100,0.6)] underline">Server Time Schedule</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Arena */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.75 }}
        >
          <Card className="bg-green-950/80 backdrop-blur-sm border-green-700/50 rounded-2xl shadow-form-glow hover:scale-[1.02] transition duration-300 drop-shadow-[0_0_15px_rgba(25,255,100,0.6)]">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-green-400">Arena Schedule</h2>
              <table className="w-full text-left border-collapse text-green-300/90">
                <thead>
                  <tr className="text-green-400">
                    <th className="p-2">Arena</th>
                    <th className="p-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {/* تغيير لون الوقت في Arena إلى الأصفر text-yellow-400 */}
                  <tr className="hover:bg-green-800/30 transition"> 
                    <td className="p-2">Random Arena</td>
                    <td className="p-2 text-yellow-400 font-medium">09:30–12:30 AM & 15:30</td>
                  </tr>
                  <tr className="hover:bg-green-800/30 transition">
                    <td className="p-2">Party Arena</td>
                    <td className="p-2 text-yellow-400 font-medium">14:30–17:30</td>
                  </tr>
                  <tr className="hover:bg-green-800/30 transition">
                    <td className="p-2">Guild Arena</td>
                    <td className="p-2 text-yellow-400 font-medium">16:00</td>
                  </tr>
                  <tr className="hover:bg-green-800/30 transition">
                    <td className="p-2">Job Arena</td>
                    <td className="p-2 text-yellow-400 font-medium">13:00–16:00</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Boss Drops */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-green-950/80 backdrop-blur-sm border-green-700/50 rounded-2xl shadow-form-glow hover:scale-[1.02] transition duration-300 drop-shadow-[0_0_15px_rgba(25,255,100,0.6)]">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-green-400">Boss Drops & Uniques</h2>

              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-green-400">
                    <th className="p-2">Boss</th>
                    <th className="p-2">Time</th>
                    <th className="p-2">Drop</th>
                  </tr>
                </thead>
                <tbody className="text-green-300/90">
                  {/* تغيير لون الوقت في Boss Drops إلى الأصفر text-yellow-400 */}
                  <tr className="hover:bg-green-800/30 transition">
                    <td className="p-2">Selket & Neith</td>
                    <td className="p-2 text-yellow-400 font-medium">11:00–13:00 PM | 16:00–18:00 PM</td>
                    <td className="p-2 text-yellow-400 font-semibold">Silver Coins</td> 
                  </tr>
                  <tr className="hover:bg-green-800/30 transition">
                    <td className="p-2">Anubis & Isis</td>
                    <td className="p-2 text-yellow-400 font-medium">13:00–15:00 PM | 19:00–21:00 PM</td>
                    <td className="p-2 text-yellow-400 font-semibold">Gold Coins</td>
                  </tr>
                  <tr className="hover:bg-green-800/30 transition">
                    <td className="p-2">Haroeris & Seth</td>
                    <td className="p-2 text-yellow-400 font-medium">15:00–17:00 PM | 20:00–22:00 PM</td>
                    <td className="p-2 text-yellow-400 font-semibold">100 Silk & Gold Coins</td>
                  </tr>
                  <tr className="hover:bg-green-800/30 transition">
                    <td className="p-2">Medusa</td>
                    <td className="p-2 text-yellow-400 font-medium">10:00 AM | 20:00 PM</td>
                    <td className="p-2 text-yellow-400 font-semibold">100 Silk & Gold Coins & Immortal Stone</td>
                  </tr>
                  <tr className="hover:bg-green-800/30 transition">
                    <td className="p-2">FGW</td>
                    <td className="p-2 text-yellow-400 font-medium">Any Time <span className="text-red-500">(There's Reset FGW Scroll)</span></td>
                    <td className="p-2 text-yellow-400 font-semibold">Books & Egy A Shield (EU&CH)</td>
                  </tr>
                  <tr className="hover:bg-green-800/30 transition">
                    <td className="p-2">HWT</td>
                    <td className="p-2 text-yellow-400 font-medium">Any Time <span className="text-red-500">2 Times Per Day, Also (There's Reset HWT Scroll)</span></td>
                    <td className="p-2 text-yellow-400 font-semibold">--</td>
                  </tr>
                  <tr className="hover:bg-green-800/30 transition">
                    <td className="p-2">2x New Uniques</td>
                    <td className="p-2 text-yellow-400 font-medium">Spawn <span className="text-red-500">2 Times Per Day</span></td>
                    <td className="p-2 text-yellow-400 font-semibold">50 silk Each</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Fortress War */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7 }}
        >
          <Card className="bg-green-950/80 backdrop-blur-sm border-green-700/50 rounded-2xl shadow-form-glow hover:scale-[1.02] transition duration-300 drop-shadow-[0_0_15px_rgba(25,255,100,0.6)]">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-green-400">Fortress War</h2>
              <table className="w-full text-left border-collapse text-green-300/90">
                <tbody>
                  <tr className="hover:bg-green-800/30 transition">
                    <td className="p-2 font-semibold">Schedule</td>
                    {/* تغيير لون الوقت في Fortress War إلى الأصفر text-yellow-400 */}
                    <td className="p-2 text-yellow-400 font-medium">Friday 20:00 → 21:30</td>
                  </tr>
                  <tr className="hover:bg-green-800/30 transition">
                    <td className="p-2 font-semibold">Reward</td>
                    <td className="p-2">Given to all guild members <span className="text-red-500">(Hotan FW Only Work)</span></td>
                  </tr>
                  <tr className="hover:bg-green-800/30 transition">
                    <td className="p-2 font-semibold">Registration</td>
                    <td className="p-2">Saturday → Thursday <span className="text-red-500">24/7</span></td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      </div>
    </div>
  );
}