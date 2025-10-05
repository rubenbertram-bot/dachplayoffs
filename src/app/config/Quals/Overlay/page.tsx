import Layout from "@/components/layout";
import { ConfigField } from "@/components/ui/ConfigField";

export default function ConfigPage() {
    return (
        <Layout>
            <main className="flex items-center gap-12 h-screen">
                <div className="w-full h-[85%] pb-8 p-2">
                    <span>Translations</span>
                    {Array.from({ length: 50 }, (_, x) => (
                        <ConfigField key={x} configKey={`Nick-${x}`} title={`Nick-${x}`} />
                    ))}
                </div>
            </main>
        </Layout>
    );
}
