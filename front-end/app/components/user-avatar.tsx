import * as Avatar from '@radix-ui/react-avatar';
import * as stylex from "@stylexjs/stylex";

type UserAvatarTypes = {
  name: string,
  image: string,
  initials: string,
  height?: number,
  width?: number,
  radius?: number,
  rounded?: boolean,
}

const UserAvatar = ({name, image, initials, height = 25, width = 25, radius, rounded}: UserAvatarTypes) => {
  return (
    <Avatar.Root className="AvatarRoot">
      <Avatar.Image
        {...stylex.props([
          styles.avatar,
          rounded ? styles.rounded : {},
          radius ? styles.radius(radius) : {}
        ])}
        src={image}
        alt={name}
        height={height}
        width={width}
      />
      <Avatar.Fallback className="AvatarFallback" delayMs={600}>
        {initials}
      </Avatar.Fallback>
    </Avatar.Root>
  )
}

export default UserAvatar;

const styles = stylex.create({
  avatar: {
    objectFit: 'cover',
  },
  radius: (radius) => ({
    borderRadius: radius,  
  }),
  rounded: {
    borderRadius: '50%',
  },
});

