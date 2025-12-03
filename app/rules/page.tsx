// app/rules/page.tsx
"use client";

import Link from "next/link";
import { 
    ExclamationTriangleIcon, 
    ChatBubbleLeftRightIcon,
    WalletIcon,
    BugAntIcon,
    BanknotesIcon,
    ShieldExclamationIcon,
    UserGroupIcon,
    ComputerDesktopIcon,
    TrashIcon,
    // أيقونات جديدة للقوائم الفرعية
    CheckBadgeIcon, 
    ShieldCheckIcon, 
    NoSymbolIcon, 
    ArrowUpOnSquareStackIcon, 
    ClockIcon, 
} from "@heroicons/react/24/outline";

// ... (باقي الكود كما هو)

export default function RulesPage() {
    return (
        <div className="bg-[#030d06] text-green-200/90 min-h-screen p-6 md:p-12" style={{
            backgroundImage: "url('/bg-img/login-signup.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}>
            <div className="max-w-5xl mx-auto space-y-10 p-6 md:p-10 bg-black/40 backdrop-blur-sm rounded-xl border border-green-800/50">
                
                {/* Main Title */}
                <h1 className="text-5xl font-extrabold text-center tracking-wide 
                                text-green-400 drop-shadow-[0_0_10px_rgba(25,255,100,0.5)] 
                                pb-6 mb-4 border-b-4 border-green-700/60">
                    <ExclamationTriangleIcon className="w-10 h-10 inline-block align-middle mr-3 text-yellow-400" /> 
                    Server Rules & Notices 📜
                </h1>
                
                <div className="grid md:grid-cols-2 gap-8">
                    {/* 1. Notices */}
                    <section className="col-span-2 p-8 rounded-2xl bg-[#0A2616] border border-green-700/50 shadow-2xl shadow-green-900/40">
                        <h2 className="text-3xl font-bold mb-5 flex items-center text-yellow-400 border-b-2 border-green-700/50 pb-3">
                            <ExclamationTriangleIcon className="w-7 h-7 mr-3 text-yellow-400" /> General Notices
                        </h2>
                        <ul className="list-none space-y-4">
                            <li className="flex items-start bg-black/20 p-3 rounded-lg hover:bg-black/40 transition">
                                <ShieldCheckIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-green-400" />
                                <span>DO NOT use a username and password you've already used on other servers.</span>
                            </li>
                            <li className="flex items-start bg-black/20 p-3 rounded-lg hover:bg-black/40 transition">
                                <CheckBadgeIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-yellow-400" />
                                <span>DO NOT use a fake <span className="font-bold text-yellow-300">Email</span> or fake <span className="font-bold text-yellow-300">Security Code</span> because you'll need it in the future for password changes or resets.</span>
                            </li>
                            <li className="flex items-start bg-black/20 p-3 rounded-lg hover:bg-black/40 transition">
                                <ShieldCheckIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-green-400" />
                                <span>Keep your information <span className="font-bold text-yellow-300">hidden</span> from others and do not share it, even with your brothers. :)</span>
                            </li>
                        </ul>
                    </section>

                    {/* 2. Chat Rules */}
                    <section className="p-6 rounded-2xl bg-[#0A2616] border border-green-700/50 shadow-xl shadow-green-900/40">
                        <h2 className="text-3xl font-bold mb-5 flex items-center text-green-400 border-b border-green-700/50 pb-3">
                            <ChatBubbleLeftRightIcon className="w-7 h-7 mr-3 text-green-500" /> Chat Rules
                        </h2>
                        <ul className="list-none space-y-4">
                            <li className="flex items-start">
                                <NoSymbolIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-red-500" />
                                <span>No insulting.</span>
                            </li>
                            <li className="flex items-start">
                                <NoSymbolIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-red-500" />
                                <span>No <span className="font-bold text-red-400">racism</span>.</span>
                            </li>
                            <li className="flex items-start">
                                <NoSymbolIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-red-500" />
                                <span>No <span className="font-bold text-red-400">spamming</span> or <span className="font-bold text-red-400">flooding</span>.</span>
                            </li>
                            <li className="flex items-start">
                                <NoSymbolIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-red-500" />
                                <span>Advertising other servers, hacks, scams, or sites is <span className="font-bold text-red-400">forbidden</span> (<span className="font-bold text-red-400">perm ban</span>).</span>
                            </li>
                            <li className="flex items-start">
                                <ShieldExclamationIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-yellow-500" />
                                <span>Breaking rules may result in <span className="font-bold text-yellow-300">3/7 days ban</span>. Insulting a <span className="font-bold text-yellow-300">GM</span> Equal <span className="font-bold text-yellow-300">permanent ban</span>.</span>
                            </li>
                            <li className="flex items-start">
                                <NoSymbolIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-red-700" />
                                <span>No insulting using <span className="font-bold text-red-600">“God”</span> or <span className="font-bold text-red-600">“Allah”</span> (<span className="font-bold text-red-600">automatic perm ban</span> if violated).</span>
                            </li>
                        </ul>
                    </section>

                    {/* 3. Trading Rules */}
                    <section className="p-6 rounded-2xl bg-[#0A2616] border border-green-700/50 shadow-xl shadow-green-900/40">
                        <h2 className="text-3xl font-bold mb-5 flex items-center text-green-400 border-b border-green-700/50 pb-3">
                            <WalletIcon className="w-7 h-7 mr-3 text-yellow-500" /> Trading Rules
                        </h2>
                        <ul className="list-none space-y-4">
                            <li className="flex items-start">
                                <CheckBadgeIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-yellow-400" />
                                <span>Only trade with <span className="font-bold text-yellow-300">trusted players</span>.</span>
                            </li>
                            <li className="flex items-start">
                                <BanknotesIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-lime-400" />
                                <span>Selling items, characters, or accounts for <span className="font-bold text-lime-300">real money is Allowed</span> but <span className="font-bold text-red-400">not recommended</span> cuz of scams.</span>
                            </li>
                            <li className="flex items-start">
                                <CheckBadgeIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-yellow-400" />
                                <span>Don't press <span className="font-bold text-yellow-300">"Approve"</span> until agreed items/gold are on the exchange side.</span>
                            </li>
                            <li className="flex items-start">
                                <ShieldExclamationIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-red-500" />
                                <span>No <span className="font-bold text-red-400">refunds</span> or interference if scammed—<span className="font-bold text-red-400">be careful</span>.</span>
                            </li>
                            <li className="flex items-start">
                                <ShieldCheckIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-green-400" />
                                <span>Do not share your account password; you are <span className="font-bold text-green-300">responsible</span> for it.</span>
                            </li>
                        </ul>
                    </section>
                </div> 

                {/* --- فاصل جديد لتنظيم باقي الأقسام --- */}
                <hr className="border-green-700/50 my-6" />

                <div className="grid md:grid-cols-3 gap-8">
                    {/* 4. Hacking & Bugs */}
                    <section className="p-6 rounded-2xl bg-[#0A2616] border border-green-700/50 shadow-xl shadow-green-900/40">
                        <h2 className="text-2xl font-bold mb-4 flex items-center text-green-400 border-b border-green-700/50 pb-3">
                            <BugAntIcon className="w-6 h-6 mr-2 text-red-500" /> Hacking & Bugs
                        </h2>
                        <ul className="list-none space-y-3">
                            <li className="flex items-start">
                                <ArrowUpOnSquareStackIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-blue-400" />
                                <span>Report bugs or glitches <span className="font-bold text-blue-300">immediately</span>.</span>
                            </li>
                            <li className="flex items-start">
                                <NoSymbolIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-red-500" />
                                <span>Abusing unreported bugs will result in a <span className="font-bold text-red-400">ban</span>.</span>
                            </li>
                        </ul>
                    </section>

                    {/* 5. Buying SPoints / Donations */}
                    <section className="p-6 rounded-2xl bg-[#0A2616] border border-green-700/50 shadow-xl shadow-green-900/40">
                        <h2 className="text-2xl font-bold mb-4 flex items-center text-green-400 border-b border-green-700/50 pb-3">
                            <BanknotesIcon className="w-6 h-6 mr-2 text-lime-500" /> SPoints / Donations
                        </h2>
                        <ul className="list-none space-y-3">
                            <li className="flex items-start">
                                <CheckBadgeIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-green-400" />
                                <span>Purchase <span className="font-bold text-green-300">SPoints</span> only from the <span className="font-bold text-green-300">official website</span>.</span>
                            </li>

                            <li className="flex items-start">
                                <ArrowUpOnSquareStackIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-blue-400" />
                                <span>Contact Any of <span className="font-bold text-blue-300">VeloraWORLD CREW</span> -- For Any Kind Of Donations 
                                    <Link href="/contact" className="underline text-red-400 hover:text-red-300 ml-1 transition duration-200">Contact Us!</Link>
                                </span>
                            </li>
                            <li className="flex items-start">
                                <UserGroupIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-cyan-400" />
                                <span>Egyptian players contact <span className="font-bold text-cyan-300">GM</span> via Facebook for SPoints Donations.</span>
                            </li>
                        </ul>
                    </section>

                    {/* 6. Reporting Players */}
                    <section className="p-6 rounded-2xl bg-[#0A2616] border border-green-700/50 shadow-xl shadow-green-900/40">
                        <h2 className="text-2xl font-bold mb-4 flex items-center text-green-400 border-b border-green-700/50 pb-3">
                            <ShieldExclamationIcon className="w-6 h-6 mr-2 text-blue-400" /> Reporting Players
                        </h2>
                        <ul className="list-none space-y-3">
                            <li className="flex items-start">
                                <CheckBadgeIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-green-400" />
                                <span>Provide <span className="font-bold text-green-300">proof</span> (screenshots, videos) to report a player.</span>
                            </li>
                            <li className="flex items-start">
                                <NoSymbolIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-red-500" />
                                <span>Without <span className="font-bold text-red-400">proof</span>, no action will be taken.</span>
                            </li>
                            <li className="flex items-start">
                                <ArrowUpOnSquareStackIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-blue-400" />
                                <span>Reports should be sent via These Links 
                                    <Link href="/contact" className="underline text-red-400 hover:text-red-300 ml-1 transition duration-200">Contact Us!</Link>
                                </span>
                            </li>
                        </ul>
                    </section>

                    {/* 7. GM Rules & 8. Bots & 9. Character Deletion (مدموجين في عمود جديد) */}
                    <section className="col-span-3 grid md:grid-cols-3 gap-8">
                        {/* GM Rules */}
                        <div className="p-6 rounded-2xl bg-[#0A2616] border border-green-700/50 shadow-xl shadow-green-900/40">
                            <h2 className="text-2xl font-bold mb-4 flex items-center text-green-400 border-b border-green-700/50 pb-3">
                                <UserGroupIcon className="w-6 h-6 mr-2 text-cyan-400" /> GM Rules
                            </h2>
                            <ul className="list-none space-y-3">
                                <li className="flex items-start">
                                    <ShieldCheckIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-green-400" />
                                    <span>GMs are here to help players; <span className="font-bold text-red-400">beware of scammers</span> claiming to be GMs.</span>
                                </li>
                                <li className="flex items-start">
                                    <ShieldExclamationIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-red-500" />
                                    <span>Report anyone <span className="font-bold text-red-400">impersonating</span> a GM <span className="font-bold text-red-400">immediately</span>.</span>
                                </li>
                            </ul>
                        </div>
                        
                        {/* Bots */}
                        <div className="p-6 rounded-2xl bg-[#0A2616] border border-green-700/50 shadow-xl shadow-green-900/40">
                            <h2 className="text-2xl font-bold mb-4 flex items-center text-green-400 border-b border-green-700/50 pb-3">
                                <ComputerDesktopIcon className="w-6 h-6 mr-2 text-indigo-400" /> Bots
                            </h2>
                            <ul className="list-none space-y-3">
                                <li className="flex items-start">
                                    <NoSymbolIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-red-500" />
                                    <span>No <span className="font-bold text-red-400">Alchemy</span> via bot (<span className="font-bold text-red-400">may destroy your items</span>).</span>
                                </li>
                            </ul>
                        </div>

                        {/* Character Deletion */}
                        <div className="p-6 rounded-2xl bg-[#0A2616] border border-green-700/50 shadow-xl shadow-green-900/40">
                            <h2 className="text-2xl font-bold mb-4 flex items-center text-green-400 border-b border-green-700/50 pb-3">
                                <TrashIcon className="w-6 h-6 mr-2 text-orange-400" /> Character Deletion
                            </h2>
                            <ul className="list-none space-y-3">
                                <li className="flex items-start">
                                    <ClockIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-green-400" />
                                    <span>Characters <span className="font-bold text-orange-300">inactive for 1 year</span> will be deleted.</span>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}