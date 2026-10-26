import Link from "next/link";
import { ArrowRight } from "lucide-react";
export default function NotFound() {
  return (
    <div className="empty-state error-page">
      <p className="eyebrow">404 / A different direction</p>
      <h1>A little off the beaten path.</h1>
      <p>The page you are looking for isn’t here. A good piece might be.</p>
      <Link className="button dark" href="/shop">
        Explore the collection <ArrowRight size={17} />
      </Link>
    </div>
  );
}
