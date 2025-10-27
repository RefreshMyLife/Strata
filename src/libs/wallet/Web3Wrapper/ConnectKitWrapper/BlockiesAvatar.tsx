import { Types } from 'connectkit';
import Blockies from 'react-blockies';

export const BlockiesAvatar = ({ address, ensImage, ensName, size }: Types.CustomAvatarProps) => {
     return <div
      style={{
        overflow: "hidden",
        borderRadius: "8px",
        height: size,
        width: size,
      }}
    >
      {ensImage && <img src={ensImage} alt={ensName ?? address} width="100%" height="100%" />}
      {!ensImage && <Blockies
        seed={address}
        size={size / 8}
        scale={8}

    />}
    </div>
}
