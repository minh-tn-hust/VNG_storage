<GameFile>
  <PropertyGroup Name="battle_CardItem" Type="Node" ID="cea67960-de82-4461-8ca6-a6b6918af7b2" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Node" Tag="233" ctype="GameNodeObjectData">
        <Size X="0.0000" Y="0.0000" />
        <Children>
          <AbstractNodeData Name="CardSelectButton" ActionTag="-935611905" Tag="12" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-69.0000" RightMargin="-69.0000" TopMargin="-93.0000" BottomMargin="-93.0000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="78" Scale9Height="121" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
            <Size X="138.0000" Y="186.0000" />
            <Children>
              <AbstractNodeData Name="CardBackground" ActionTag="-148388764" Tag="235" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="10.0000" RightMargin="10.0000" TopMargin="-50.3800" BottomMargin="72.3800" ctype="SpriteObjectData">
                <Size X="118.0000" Y="164.0000" />
                <Children>
                  <AbstractNodeData Name="MonsterSprite" ActionTag="-1362116151" Tag="11" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="36.0000" RightMargin="36.0000" TopMargin="59.0000" BottomMargin="59.0000" ctype="SpriteObjectData">
                    <Size X="46.0000" Y="46.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="59.0000" Y="82.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5000" />
                    <PreSize X="0.3898" Y="0.2805" />
                    <FileData Type="Default" Path="Default/Sprite.png" Plist="" />
                    <BlendFunc Src="1" Dst="771" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="CardBorder" ActionTag="1693866690" Tag="234" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-10.0000" RightMargin="-10.0000" TopMargin="-11.0000" BottomMargin="-11.0000" ctype="SpriteObjectData">
                    <Size X="138.0000" Y="186.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="59.0000" Y="82.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5000" />
                    <PreSize X="1.1695" Y="1.1341" />
                    <FileData Type="Normal" Path="card_asset/card_border_1.png" Plist="" />
                    <BlendFunc Src="1" Dst="771" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="EnergyRequired" ActionTag="-2007999523" Tag="238" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="21.5000" RightMargin="21.5000" TopMargin="120.8400" BottomMargin="-41.8400" ctype="SpriteObjectData">
                    <Size X="75.0000" Y="85.0000" />
                    <Children>
                      <AbstractNodeData Name="EnergyLabel" ActionTag="-727902547" Tag="239" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="15.5000" RightMargin="15.5000" TopMargin="25.0000" BottomMargin="25.0000" FontSize="24" LabelText="20" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" OutlineEnabled="True" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ShadowEnabled="True" ctype="TextObjectData">
                        <Size X="44.0000" Y="35.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="37.5000" Y="42.5000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.5000" Y="0.5000" />
                        <PreSize X="0.5867" Y="0.4118" />
                        <FontResource Type="Normal" Path="SVN-Supercell Magic.ttf" Plist="" />
                        <OutlineColor A="255" R="0" G="0" B="0" />
                        <ShadowColor A="255" R="0" G="0" B="0" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="59.0000" Y="0.6600" />
                    <Scale ScaleX="0.5100" ScaleY="0.5100" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.0040" />
                    <PreSize X="0.6356" Y="0.5183" />
                    <FileData Type="Normal" Path="common_asset/common_icon_energy.png" Plist="" />
                    <BlendFunc Src="1" Dst="771" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="69.0000" Y="154.3800" />
                <Scale ScaleX="0.9600" ScaleY="0.9600" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.8300" />
                <PreSize X="0.8551" Y="0.8817" />
                <FileData Type="Normal" Path="card_asset/card_background_1.png" Plist="" />
                <BlendFunc Src="1" Dst="771" />
              </AbstractNodeData>
              <AbstractNodeData Name="CancelButton" ActionTag="-701411513" Tag="130" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="-2.5000" RightMargin="-2.5000" TopMargin="132.9100" BottomMargin="0.0900" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="164" Scale9Height="89" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="143.0000" Y="53.0000" />
                <Children>
                  <AbstractNodeData Name="CancelLabel" ActionTag="529426013" Tag="131" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="27.2203" RightMargin="43.7797" TopMargin="14.5000" BottomMargin="14.5000" FontSize="16" LabelText="Hủy -3" OutlineEnabled="True" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ShadowEnabled="True" ctype="TextObjectData">
                    <Size X="72.0000" Y="24.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="63.2203" Y="26.5000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.4421" Y="0.5000" />
                    <PreSize X="0.5035" Y="0.4528" />
                    <FontResource Type="Normal" Path="SVN-Supercell Magic.ttf" Plist="" />
                    <OutlineColor A="255" R="0" G="0" B="0" />
                    <ShadowColor A="255" R="45" G="45" B="45" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="EnergyRequired_0" ActionTag="-913522648" Tag="132" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="73.7111" RightMargin="-5.7111" TopMargin="-16.0000" BottomMargin="-16.0000" ctype="SpriteObjectData">
                    <Size X="75.0000" Y="85.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="111.2111" Y="26.5000" />
                    <Scale ScaleX="0.2500" ScaleY="0.2500" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.7777" Y="0.5000" />
                    <PreSize X="0.5245" Y="1.6038" />
                    <FileData Type="Normal" Path="common_asset/common_icon_energy.png" Plist="" />
                    <BlendFunc Src="1" Dst="771" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="69.0000" Y="26.5900" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.1430" />
                <PreSize X="1.0362" Y="0.2849" />
                <FontResource Type="Default" Path="" Plist="" />
                <TextColor A="255" R="255" G="255" B="255" />
                <DisabledFileData Type="Normal" Path="common_asset/common_btn_red.png" Plist="" />
                <PressedFileData Type="Normal" Path="common_asset/common_btn_red.png" Plist="" />
                <NormalFileData Type="Normal" Path="common_asset/common_btn_red.png" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position />
            <Scale ScaleX="1.0200" ScaleY="1.0200" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition />
            <PreSize X="0.0000" Y="0.0000" />
            <TextColor A="255" R="65" G="65" B="70" />
            <DisabledFileData Type="Normal" Path="battle_asset/battle_card_box.png" Plist="" />
            <PressedFileData Type="Normal" Path="battle_asset/battle_card_box.png" Plist="" />
            <NormalFileData Type="Normal" Path="battle_asset/battle_card_box.png" Plist="" />
            <OutlineColor A="255" R="255" G="0" B="0" />
            <ShadowColor A="255" R="110" G="110" B="110" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameFile>