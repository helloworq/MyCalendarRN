import React, { useContext, useState } from "react";
import {
    Dimensions,
    View,
    TouchableOpacity,
    Text,
    FlatList,
    ImageBackground,
    Image,
    ToastAndroid,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ImageCropPicker from 'react-native-image-crop-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { PreferencesContext } from "./MyPreferencesContext";
import ImgStroage from "./storage/ImgStroage";
import Modal from "react-native-modal";
import ImageView from 'react-native-image-viewing'
import MyPullDownNative from "./compoment/MyPullDownNative";

const MyHomePage = ({ navigation }) => {
    const { mode, setMode, theme, bgImg, setBgImg } = useContext(PreferencesContext)
    const screenHeight = Dimensions.get("window").height - 20
    const screenWidth = Dimensions.get("window").width
    const imgWidth = screenWidth / 3 - 20
    const split = 10;
    const borderRadius = 10
    const [visible, setVisible] = useState(false)
    const [currImg, setCurrImg] = useState(null)
    const [close, setClose] = useState(false)

    return (
        <>
            <ImageBackground
                source={ImgStroage[bgImg]}
                resizeMode='stretch'
                style={{ flex: 1, backgroundColor: theme.colors.totalOpacityBgColor }}
            >
                <ImageView
                    images={[{ uri: currImg }]}
                    visible={close}
                    onRequestClose={() => setClose(false)}
                />

                <View style={{ marginTop: 10, marginRight: 10, marginLeft: 10, height: '92.8%', }}>
                    <MyPullDownNative
                        pullDownFunc={() => console.log(66666666)}
                        pullUpFunc={() => console.log(999999999)}
                        mylist={() => {
                            return (
                                <FlatList
                                    data={[
                                        {
                                            "name": "李白",
                                            "content": "君不见黄河之水天上来，奔流到海不复回。\n" +
                                                "君不见高堂明镜悲白发，朝如青丝暮成雪。\n" +
                                                "人生得意须尽欢，莫使金樽空对月。\n" +
                                                "天生我材必有用，千金散尽还复来。\n" +
                                                "烹羊宰牛且为乐，会须一饮三百杯。\n" +
                                                "岑夫子，丹丘生，将进酒，杯莫停。\n" +
                                                "与君歌一曲，请君为我倾耳听。\n" +
                                                "钟鼓馔玉不足贵，但愿长醉不复醒。\n" +
                                                "古来圣贤皆寂寞，惟有饮者留其名。\n" +
                                                "陈王昔时宴平乐，斗酒十千恣欢谑。\n" +
                                                "主人何为言少钱，径须沽取对君酌。\n" +
                                                "五花马，千金裘，呼儿将出换美酒，\n" +
                                                "与尔同销万古愁。",
                                            "model": "Honor Magic 2",
                                            "time": "盛唐",
                                            "avatar": 'https://www.gushicimingju.com/upload/people/libai.jpg',
                                            "photos": [
                                                'https://ts1.cn.mm.bing.net/th/id/R-C.951aaaf4bed45b525be30857bf0f3a0a?rik=rIYN4ZL%2fO7VI4Q&riu=http%3a%2f%2fi2.qhimg.com%2ft01244eebc268f3d547.jpg&ehk=n5KFeP30VkF8y6IVpcgVkobzSZUmOldmcomSmjtslRg%3d&risl=&pid=ImgRaw&r=0',
                                                'https://img.zcool.cn/community/01d5445bfb7be5a80121ab5d8062e2.jpg@1280w_1l_2o_100sh.jpg',
                                                'https://img.zcool.cn/community/01992b5822d557a84a0d304fd5dd7c.jpg@1280w_1l_2o_100sh.jpg'
                                            ]
                                        },
                                        {
                                            "name": "杜甫",
                                            "content": "八月秋高风怒号，卷我屋上三重茅。茅飞渡江洒江郊，高者挂罥长林梢，下者飘转沉塘坳。" +
                                                "南村群童欺我老无力，忍能对面为盗贼。公然抱茅入竹去，唇焦口燥呼不得，归来倚杖自叹息。" +
                                                "俄顷风定云墨色，秋天漠漠向昏黑。布衾多年冷似铁，娇儿恶卧踏里裂。床头屋漏无干处，雨脚如麻未断绝。自经丧乱少睡眠，长夜沾湿何由彻！" +
                                                "安得广厦千万间，大庇天下寒士俱欢颜，风雨不动安如山。呜呼！何时眼前突兀见此屋，吾庐独破受冻死亦足！",
                                            "model": "ONE PLUS 11",
                                            "time": "唐中后",
                                            "avatar": 'https://www.gushicimingju.com/upload/people/dufu.jpg',
                                            "photos": [
                                                'https://gss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/5bafa40f4bfbfbeddb5775db75f0f736afc31f03.jpg',
                                                'https://ts1.cn.mm.bing.net/th/id/R-C.a0dea4f2b1d46fdfbefec03868db9d6c?rik=9lVH6jBhIfSEsw&riu=http%3a%2f%2fpic.baike.soso.com%2fp%2f20130516%2f20130516183053-604373591.jpg&ehk=4sv2RiFRB7dzfUi4%2fWn1o00CTsv3TedAVuI9SZDV1I8%3d&risl=&pid=ImgRaw&r=0',
                                                'https://img1.artron.net/auction/2011/art000759/d/art0007590185.jpg',
                                                'https://ts1.cn.mm.bing.net/th/id/R-C.1127a265694487686c9ec392bb576fd8?rik=y%2fQOgSFwOc1MgQ&riu=http%3a%2f%2fwww.guwenxuexi.com%2fwp-content%2fuploads%2f2016%2f09%2f13-38.jpg&ehk=WLUmub%2bDt1mjHmZn0D79hbpS0oH%2bG10EJtWAiXYLfP4%3d&risl=&pid=ImgRaw&r=0',
                                                'https://ts1.cn.mm.bing.net/th/id/R-C.e3a31bf14cf6041284a07d02b9658ce9?rik=RmVVvjvh7FqT3w&riu=http%3a%2f%2fwww.guwenxuexi.com%2fwp-content%2fuploads%2f2016%2f09%2f10-55.jpg&ehk=VAXGNNBtVN7%2fnW9N0G7KEY1lduzAMmkyOQ9%2fdKESCu0%3d&risl=&pid=ImgRaw&r=0',
                                            ]
                                        },
                                        {
                                            "name": "曹操",
                                            "content": "对酒当歌，人生几何！譬如朝露，去日苦多。\n" +
                                                "慨当以慷，忧思难忘。何以解忧？唯有杜康。\n" +
                                                "青青子衿，悠悠我心。但为君故，沉吟至今。\n" +
                                                "呦呦鹿鸣，食野之苹。我有嘉宾，鼓瑟吹笙。\n" +
                                                "明明如月，何时可掇？忧从中来，不可断绝。\n" +
                                                "越陌度阡，枉用相存。契阔谈讌，心念旧恩。\n" +
                                                "月明星稀，乌鹊南飞。绕树三匝，何枝可依？\n" +
                                                "山不厌高，海不厌深。周公吐哺，天下归心。",
                                            "model": "HUAWEI MATE 60 PRO",
                                            "time": "东汉末年",
                                            "avatar": 'https://www.gushicimingju.com/upload/people/caocao.jpg',
                                            "photos": [
                                                'https://ts1.cn.mm.bing.net/th/id/R-C.98fd7bb3e5be372e800c91566c418ab1?rik=Vtib1Sc5%2fsy6JA&riu=http%3a%2f%2fwww.zaoxu.com%2fuploadfile%2fimgall%2f02d788d43f8794a4c2e039f57f03f41bd5ad6e394f.jpg&ehk=hH9ClGjVPF%2f7f%2f0HoN2g92mgYwIu80cZy6RN9dqMiGw%3d&risl=&pid=ImgRaw&r=0',
                                                'https://ts1.cn.mm.bing.net/th/id/R-C.0ebdce7eda9f4c6107e250a0e1752a07?rik=o80v56R3wU0%2bsQ&riu=http%3a%2f%2fwww.chinayis.com%2fUploads%2fPicture%2f2018-06-28%2f5b345dab44a89.jpg&ehk=qWxhaBfJgNSa7GxbvGF9owgRXB%2bG3Ou1luKeM%2fyC1pE%3d&risl=&pid=ImgRaw&r=0',
                                                'https://ts1.cn.mm.bing.net/th/id/R-C.3a8808d549cd68ffdc5bcbd4d2fddcd9?rik=7QkIkFfaL9kv1g&riu=http%3a%2f%2fwww.99zihua.com%2fimages%2fgoods%2f20140108%2f684b0ddb1d719d23.jpg&ehk=Ea7zKubzKGu1PL%2bZurm3GiYdocKnRUtnVfBFx2K9qac%3d&risl=&pid=ImgRaw&r=0',
                                                'https://img1.artron.net/auction/2019/art515644/d/art5156440065.jpg',
                                                'https://ts1.cn.mm.bing.net/th/id/R-C.f3926435b37357e77e2fd38a0a2faac5?rik=%2bG5sJcw29jUydA&riu=http%3a%2f%2fwww.zgwlmszlg.com%2fuploadfile%2f2016%2f0802%2f20160802050431805.jpg&ehk=WgEGoDTW16NVAHV3z4RPY%2fMLzKxekKM5xetzCBlcEMU%3d&risl=&pid=ImgRaw&r=0',
                                                'https://img1.artron.net/auction/2020/art517242/d/art5172420013.jpg',
                                                'https://img1.artron.net/auction/2021/art517988/d/art5179880001.jpg',
                                            ]
                                        },
                                        {
                                            "name": "归有光",
                                            "content": "项脊轩，旧南阁子也。室仅方丈，可容一人居。百年老屋，尘泥渗漉，雨泽下注；每移案，顾视，无可置者。又北向，不能得日，日过午已昏。余稍为修葺，使不上漏。前辟四窗，垣墙周庭，以当南日，日影反照，室始洞然。又杂植兰桂竹木于庭，旧时栏楯，亦遂增胜。借书满架，偃仰啸歌，冥然兀坐，万籁有声；而庭堦寂寂，小鸟时来啄食，人至不去。三五之夜，明月半墙，桂影斑驳，风移影动，珊珊可爱。(堦寂寂 一作：阶寂寂)" +
                                                "然余居于此，多可喜，亦多可悲。先是庭中通南北为一。迨诸父异爨，内外多置小门，墙往往而是。东犬西吠，客逾庖而宴，鸡栖于厅。庭中始为篱，已为墙，凡再变矣。家有老妪，尝居于此。妪，先大母婢也，乳二世，先妣抚之甚厚。室西连于中闺，先妣尝一至。妪每谓余曰：”某所，而母立于兹。”妪又曰：”汝姊在吾怀，呱呱而泣；娘以指叩门扉曰：‘儿寒乎？欲食乎？’吾从板外相为应答。”语未毕，余泣，妪亦泣。余自束发，读书轩中，一日，大母过余曰：”吾儿，久不见若影，何竟日默默在此，大类女郎也？”比去，以手阖门，自语曰：”吾家读书久不效，儿之成，则可待乎！”顷之，持一象笏至，曰：”此吾祖太常公宣德间执此以朝，他日汝当用之！”瞻顾遗迹，如在昨日，令人长号不自禁。" +
                                                "轩东，故尝为厨，人往，从轩前过。余扃牖而居，久之，能以足音辨人。轩凡四遭火，得不焚，殆有神护者。" +
                                                "项脊生曰：“蜀清守丹穴，利甲天下，其后秦皇帝筑女怀清台；刘玄德与曹操争天下，诸葛孔明起陇中。方二人之昧昧于一隅也，世何足以知之，余区区处败屋中，方扬眉、瞬目，谓有奇景。人知之者，其谓与坎井之蛙何异？”（人教版《中国古代诗歌散文欣赏》中无此段文字；沪教版无此段。）" +
                                                "余既为此志，后五年，吾妻来归，时至轩中，从余问古事，或凭几学书。吾妻归宁，述诸小妹语曰：”闻姊家有阁子，且何谓阁子也？”其后六年，吾妻死，室坏不修。其后二年，余久卧病无聊，乃使人复葺南阁子，其制稍异于前。然自后余多在外，不常居。" +
                                                "庭有枇杷树，吾妻死之年所手植也，今已亭亭如盖矣。",
                                            "model": "XIAO MI 13",
                                            "time": "明中期",
                                            "avatar": 'https://www.gushicimingju.com/upload/people/guiyouguang.jpeg',
                                            "photos": [
                                                'https://img-preview.51jiaoxi.com/3/2/12802107/0/0.jpg?x-oss-process=image/resize,w_794',
                                                'https://imgs.guwendianji.com/wp-content/uploads/2016/10/9-70.jpg',
                                            ]
                                        }
                                    ]}
                                    renderItem={(row) => {
                                        return (
                                            <>
                                                <View style={{ backgroundColor: theme.colors.bgColor, borderRadius: borderRadius, padding: 10 }}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                                        <View style={{ flexDirection: 'row', width: '80%' }}>
                                                            <Image source={{ uri: row.item.avatar }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
                                                            <View style={{ justifyContent: 'space-around' }}>
                                                                <Text style={{ fontWeight: 'bold', fontSize: 18, color: theme.colors.fontColor }} >{row.item.name}</Text>
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <Text style={{ marginRight: 10, color: 'gray' }}>{row.item.time}</Text>
                                                                    <Text style={{ color: 'gray' }} >来自 {row.item.model}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        <TouchableOpacity>
                                                            <FontAwesome name='angle-down' size={20} color={theme.colors.iconColor} />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <Text style={{ fontSize: 17, color: theme.colors.fontColor }}>{row.item.content}</Text>

                                                    <FlatList
                                                        data={row.item.photos}
                                                        renderItem={(rowSecond) => {
                                                            return (
                                                                <>
                                                                    <TouchableOpacity
                                                                        onPress={() => {
                                                                            setClose(true)
                                                                            setCurrImg(rowSecond.item)
                                                                        }}
                                                                    >
                                                                        <View style={{ width: imgWidth + split, height: imgWidth + split }}>
                                                                            <Image source={{ uri: rowSecond.item }} style={{ width: imgWidth, height: imgWidth }} />
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                </>
                                                            )
                                                        }}
                                                        numColumns={3}
                                                        keyExtractor={(item, index) => {
                                                            return item + index
                                                        }}
                                                        horizontal={false}
                                                    />
                                                </View>
                                            </>
                                        )
                                    }}

                                    keyExtractor={(item, index) => {
                                        return item.path + index
                                    }}
                                    ItemSeparatorComponent={() => <View style={{ height: split }} />}
                                    horizontal={false}
                                    numColumns={1}
                                />
                            )
                        }}
                    />
                </View>

                <View style={{
                    backgroundColor: theme.colors.bgColor,
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: screenWidth,
                    height: '6%',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('MyMoment')
                            }}>
                                <View>
                                    <MaterialIcons name="camera" size={50} color={theme.colors.iconColor} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <TouchableOpacity onPress={() => {
                                setVisible(!visible)
                            }}>
                                <View>
                                    < MaterialIcons name="add-circle" size={50} color={theme.colors.iconColor} />
                                </View>
                                <Modal
                                    backdropColor={'white'}
                                    useNativeDriver={true}
                                    animationIn='fadeInUp'
                                    animationOut='fadeOutDown'
                                    isVisible={visible}
                                    onSwipeComplete={() => setVisible(false)}
                                    onBackdropPress={() => setVisible(false)}
                                    onBackButtonPress={() => setVisible(false)}
                                >
                                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => {
                                            setVisible(!visible)
                                            ImageCropPicker.openPicker({
                                                multiple: true
                                            }).then(images => {
                                                navigation.navigate('MyMomentUploader', {
                                                    'datas': images
                                                })
                                            }).catch(e => ToastAndroid.show('未获取权限', ToastAndroid.SHORT))
                                        }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                < MaterialIcons name="photo" size={50} color={theme.colors.iconColor} />
                                                <Text style={{ fontSize: 30, color: theme.colors.fontColor }}>从相册选择</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            setVisible(!visible)
                                            ImageCropPicker.openCamera({
                                                width: Dimensions.get('window').width,
                                                height: Dimensions.get('window').height,
                                            }).then(images => {
                                                images = Array.isArray(images) ? images : [images]
                                                navigation.navigate('MyMomentUploader', {
                                                    'datas': images
                                                })
                                            })
                                        }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                < MaterialIcons name="camera-alt" size={50} color={theme.colors.iconColor} />
                                                <Text style={{ fontSize: 30, color: theme.colors.fontColor }}>从相机记录</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
                                <View>
                                    <FontAwesome name="user" size={50} color={theme.colors.iconColor} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground >
        </>
    )
};

export default MyHomePage