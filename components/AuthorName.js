import Link from 'next/link'

export default function AuthorName({ user }) {
	return (
		<span className="author">
			<Link href={ `/node/${ user.id.toString() }` }>
				<a>
					<span className="emoji">{ user.emoji }</span>
					<span className="name">{ user.text }</span>
				</a>
			</Link>
		</span>
	);
};
