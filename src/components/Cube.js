import { useBox } from "@react-three/cannon"
import * as textures from "../images/textures"
import { useStore } from "../hooks/useStore"


export const Cube = ({ position, texture }) => {
    const [ref] = useBox(() => ({
        type: 'Static',
        position
    }))

    const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube])

    const activeTexture = textures[texture + 'Texture']

    return (
        <mesh onClick={(e) => {
            e.stopPropagation()
            const clickedFace = Math.floor(e.faceIndex / 2)
            const { x, y, z } = ref.current.position
            console.log('e',e)
            if (e.altKey) {
                console.log("altkey")
                removeCube(x, y, z)
                return
            }
            else if (clickedFace === 0) {
                addCube(x + 1, y, z)
            } else if (clickedFace === 1) {
                addCube(x - 1, y, z)
            } else if (clickedFace === 2) {
                addCube(x, y + 1, z)
            } else if (clickedFace === 3) {
                addCube(x, y - 1, z)
            } else if (clickedFace === 4) {
                addCube(x, y, z + 1)
            } else if (clickedFace === 6) {
                addCube(x, y, z - 1)
            }
        }} ref={ref}>
            <boxBufferGeometry attach="geometry" />
            <meshStandardMaterial map={activeTexture} attach="material" />

        </mesh>
    )
}