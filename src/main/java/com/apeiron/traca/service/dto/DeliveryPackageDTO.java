package com.apeiron.traca.service.dto;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.time.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Locale;
import java.util.Objects;
import com.apeiron.traca.domain.enumeration.DeliveryPackageStatus;
import com.apeiron.traca.domain.enumeration.Fragility;

/**
 * A DTO for the DeliveryPackage entity.
 */
public class DeliveryPackageDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private String code;

    private String receiverFirstName;

    private String receiverLastName;

    @NotNull
    private Double receiverPhone;

    private DeliveryPackageStatus status;

    private Instant creationDate;

    private Float height;

    private Float width;

    private Float weight;

    private Fragility fragility;


    private Long addressId;

    private Long shipperId;

    private Long runSheetId;
    private ShipperDTO shipper;

    private AddressDTO address;

    private Double price;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getPrice() {
        return price;
    }
    public String getPriceAsString() {
        NumberFormat format = NumberFormat.getInstance(Locale.FRANCE);

        return format.format(price);
    }
    public void setPrice(Double price) {
        this.price = price;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getReceiverFirstName() {
        return receiverFirstName;
    }

    public void setReceiverFirstName(String receiverFirstName) {
        this.receiverFirstName = receiverFirstName;
    }

    public String getReceiverLastName() {
        return receiverLastName;
    }

    public void setReceiverLastName(String receiverLastName) {
        this.receiverLastName = receiverLastName;
    }

    public Double getReceiverPhone() {
        return receiverPhone;
    }
    public void setReceiverPhone(Double receiverPhone) {
        this.receiverPhone = receiverPhone;
    }

    public DeliveryPackageStatus getStatus() {
        return status;
    }

    public void setStatus(DeliveryPackageStatus status) {
        this.status = status;
    }

    public Instant getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public Float getHeight() {
        return height;
    }

    public void setHeight(Float height) {
        this.height = height;
    }

    public Float getWidth() {
        return width;
    }

    public void setWidth(Float width) {
        this.width = width;
    }

    public Float getWeight() {
        return weight;
    }

    public void setWeight(Float weight) {
        this.weight = weight;
    }

    public Fragility getFragility() {
        return fragility;
    }

    public void setFragility(Fragility fragility) {
        this.fragility = fragility;
    }

    public Long getAddressId() {
        return addressId;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }

    public Long getShipperId() {
        return shipperId;
    }

    public void setShipperId(Long shipperId) {
        this.shipperId = shipperId;
    }

    public Long getRunSheetId() {
        return runSheetId;
    }

    public void setRunSheetId(Long runSheetId) {
        this.runSheetId = runSheetId;
    }

    public ShipperDTO getShipper() {
        return shipper;
    }

    public void setShipper(ShipperDTO shipper) {
        this.shipper = shipper;
    }

    public AddressDTO getAddress() {
        return address;
    }

    public void setAddress(AddressDTO address) {
        this.address = address;
    }


    public String receiverPhoneAsString (){
        return String.valueOf(receiverPhone);
    }

    public String getFargilityString() {
        if(fragility!=null) {
            return fragility.name();
        }else {
            return "";
        }
    }
    public String getReceiverPhoneAsString(){
        if (receiverPhone!=null) {
            return String.valueOf(receiverPhone.longValue());
        } else {
            return "NA";
        }
    }
    public String getCreationDateString(){
        Date myDate = Date.from(creationDate);
        SimpleDateFormat formatter = new SimpleDateFormat("dd MM yyyy HH:mm:ss");
        return formatter.format(myDate);
    }
    public String getCreationDateLocalString(){

        LocalDate localDate = LocalDateTime.ofInstant(creationDate, ZoneOffset.UTC).toLocalDate();
        LocalTime localTime= LocalDateTime.ofInstant(creationDate, ZoneOffset.UTC).toLocalTime();
        return localDate.toString()+"\n"+localTime;
    }

    public String getPackageAdresseString() {
        if(address!=null){
            return address.getLine1()+" \n"+address.getLine2()+"\n"+address.getCity()+" "+address.getPostalCode();
        }else return "";

    }

    public String getChipperFullName() {
        if(shipper!=null){
        return shipper.getFirstName()+" "+shipper.getLastName()+"\n"+shipper.getFirstPhoneAsString();
        }else return "";
    }
    public String getChipperTel() {
        if(shipper!=null){
            return shipper.getFirstPhoneAsString();
        }else return "NA";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DeliveryPackageDTO deliveryPackageDTO = (DeliveryPackageDTO) o;
        if (deliveryPackageDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), deliveryPackageDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DeliveryPackageDTO{" +
            "id=" + id +
            ", code='" + code + '\'' +
            ", receiverFirstName='" + receiverFirstName + '\'' +
            ", receiverLastName='" + receiverLastName + '\'' +
            ", receiverPhone=" + receiverPhone +
            ", status=" + status +
            ", creationDate=" + creationDate +
            ", height=" + height +
            ", width=" + width +
            ", weight=" + weight +
            ", fragility=" + fragility +
            ", addressId=" + addressId +
            ", shipperId=" + shipperId +
            ", runSheetId=" + runSheetId +
            ", shipper=" + shipper +
            ", address=" + address +
            ", price=" + price +
            '}';
    }
}
