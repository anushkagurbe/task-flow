import { Link } from "react-router-dom";
import { ArrowRight, Circle, CircleCheck, CircleDashed, CircleDot, WavesHorizontal } from 'lucide-react';

let stages = [
    { label: 'Todo', icon: Circle, color: 'text-gray-200' },
    { label: 'In progress', icon: CircleDashed, color: 'text-[#4f46e5]' },
    { label: 'Review', icon: CircleDot, color: 'text-amber-500' },
    { label: 'Completed', icon: CircleCheck, color: 'text-teal-500' },
];

let Landing = ()=>{
    return(
        <div className="min-h-screen bg-[#f1f4f8]">

            <header className="flex items-center justify-between px-6 py-6 mx-auto max-w-7xl">
                <div className="flex items-center gap-3">
                    <WavesHorizontal className="text-[#4f46e5]" />
                    <h2 className="font-serif text-[20px] text-gray-900">TaskFlow</h2>
                </div>

                <div className="flex items-center gap-3 flex-col sm:flex-row">
                    <Link to="/signin" className="rounded-lg text-gray-500 font-bold hover:bg-gray-200 py-2 px-4">Sign In</Link>
                    <Link to="/signup" className="rounded-lg text-white bg-[#131a2f] py-2 px-4 font-bold hover:bg-[#4f46e5]">Get started</Link>
                </div>
            </header>

            <section className="mx-w-5xl mx-auto text-center pt-16 sm:pt-24 pb-10 px-6 sm:px-10">
                <p className="font-mono uppercase text-xs tracking-[0.2em] text-[#4338ca]">For teams who ship, not just plan</p>
                <h1 className="mx-auto font-medium max-w-4xl text-5xl sm:text-6xl text-[#131a2f] leading-[1.08] font-serif pt-5">
                    Work moves in <span className="italic text-[#4338ca] ">one direction.</span> Forward
                </h1>
                <p className="pt-5 text-lg mx-auto max-w-xl text-gray-900/60">TaskFlow keeps every task on a clear path from idea to done — with the visibility admins need and the focus your team wants.</p>
                <div className="mt-9 flex items-center justify-center gap-3 flex-col sm:flex-row">
                    <Link to="/signup" className="flex gap-2 items-center rounded-lg text-white bg-[#131a2f] py-3 px-6 font-bold hover:bg-[#4f46e5]">
                        Start for free <ArrowRight size={18}/>
                    </Link>
                    <Link to="/signin" className="rounded-lg text-gray-900 font-bold bg-[#ffffff] border border-[#eaeaec] py-3 px-6 hover:border-[#9d9ac0] hover:text-[#4338ca]">
                        I have an account
                    </Link>
                </div>
            </section>

            <section className="mx-auto max-w-5xl px-6 py-10 sm:px-10">
                <div className="bg-[#ffffff] border border-[#eaeaec] p-8 sm:p-12 rounded-lg  shadow-xl">
                    <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                        {
                            stages.map((stage, index)=> (
                                <div key={index} className="flex flex-1 gap-3 items-center">
                                    <div className="flex items-center gap-3">
                                        <stage.icon size={22} className={ stage.color } strokeWidth={2}  />
                                        <span className="font-medium text--[#131a2f]">{stage.label}</span>
                                    </div>
                                    {
                                        index < stages.length - 1 && (
                                            <div className="h-px mx-3 hidden sm:block bg-gray-200 flex-1"></div>
                                        ) 
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <p className="max-w-lg mt-8 text-gray-700">
                        Every task travels this rail. Admins see the whole line across the team; each person sees their own stretch of track — nothing gets lost between stations.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 mt-6">
                    <FeatureCard 
                        label="Role-aware by design"
                        description="Admins get a bird's-eye view and can assign work. Everyone else stays focused on what's theirs."
                    />
                    <FeatureCard 
                        label="Built for real teams"
                        description="Comments, due dates, priorities and tags — the essentials, done well, without the clutter."
                    />
                    <FeatureCard 
                        label="Secure by default"
                        description="JWT auth, hashed passwords, and rate-limited endpoints keep your team's work protected."
                    />
                </div>
            </section>

        </div>

    )
}

export default Landing;

let FeatureCard = ({label, description}) =>{
    return (
        <div className="bg-[#ffffff] rounded-lg p-6 shadow-xl">
            <h3 className="text-lg text-gray-900 font-serif mb-2">{label}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    )
}